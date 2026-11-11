import { site, fallbackPosts, blogCovers } from '../data';

export type Post = {
  title: string;
  subtitle: string;
  url: string;
  date: string;
  cover: string;
  readTime?: string;
};

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : '';
};

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const readTime = (html: string) => {
  const words = stripHtml(html).split(' ').length;
  return words > 50 ? `${Math.max(1, Math.round(words / 220))} min read` : undefined;
};

// Compare URLs loosely (ignore http/https, "www.", query strings and a trailing slash).
const norm = (u: string) => u.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/[?#].*$/, '').replace(/\/+$/, '');
const withCover = (p: Post): Post => {
  const o = blogCovers.find((c) => norm(c.post) === norm(p.url));
  return o ? { ...p, cover: o.image } : p;
};

/** Reads the newest posts from the Hashnode RSS feed when the site builds. */
export async function getPosts(limit = 2): Promise<Post[]> {
  try {
    const res = await fetch(new URL('rss.xml', site.blog), { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`feed returned ${res.status}`);
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
    const posts = items.slice(0, limit).map((item) => {
      const description = tag(item, 'description');
      const content = tag(item, 'content:encoded') || description;
      const cover =
        tag(item, 'cover_image') ||
        item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ||
        item.match(/<media:content[^>]*url="([^"]+)"/)?.[1] ||
        content.match(/<img[^>]*src="([^"]+)"/)?.[1] ||
        '';
      const text = stripHtml(description);
      return {
        title: tag(item, 'title'),
        subtitle: text.length > 140 ? text.slice(0, 137).trimEnd() + '…' : text,
        url: tag(item, 'link'),
        date: tag(item, 'pubDate'),
        cover,
        readTime: readTime(content),
      };
    });
    if (posts.length) return posts.map(withCover);
    throw new Error('feed had no posts');
  } catch (err) {
    console.warn(`[blog] using fallback posts: ${(err as Error).message}`);
    return fallbackPosts.slice(0, limit).map(withCover);
  }
}

export const formatDate = (d: string) => {
  const date = new Date(d);
  return isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
};

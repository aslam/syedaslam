// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Syed Aslam';
export const SITE_DESCRIPTION =
  'Personal blog about technology, development, and thoughts on life.';
export const SITE_URL = 'https://syedaslam.com';

export const GENERATE_SLUG_FROM_TITLE = true;
export const TRANSITION_API = true;

export const SITE = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
  enabled: true,
  config: {
    disable: false,
    config: {
      image: 'https://picsum.photos/seed/astrofy/1200/630',
      imageType: 'image/png',
      width: 1200,
      height: 630,
    },
  },
};

export const KNOWN_LANGUAGES = {
  English: 'en',
};

export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/aslam/syedaslam`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

export const SIDEBAR = [
  {
    text: 'Pages',
    header: true,
  },
  {
    text: 'Blog',
    header: true,
    items: [
      {
        text: 'All Posts',
        link: 'blog',
      },
    ],
  },
  {
    text: 'More',
    header: true,
    items: [
      {
        text: 'RSS',
        link: '/rss.xml',
      },
    ],
  },
];

export const SIDEBAR_NAVIGATION = [
  {
    text: 'Get Started',
    items: [
      {
        text: 'Introduction',
        link: 'blog/introduction/',
      },
    ],
  },
];

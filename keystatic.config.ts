import { collection, config, fields, singleton } from '@keystatic/core';

// Every visible string has an EN and ID version.
const t = (label: string, multiline = false) =>
  fields.object(
    {
      en: fields.text({ label: 'English', multiline, validation: { isRequired: true } }),
      id: fields.text({ label: 'Indonesia', multiline, validation: { isRequired: true } }),
    },
    { label, layout: [6, 6] },
  );

const url = (label: string) => fields.url({ label });

const image = (label: string) =>
  fields.image({ label, directory: 'src/assets/images', publicPath: '/src/assets/images/' });

export default config({
  // ponytail: repo name is a placeholder until the GitHub repo exists (v1 already uses IzayoiS/portfolio-web).
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: { owner: 'IzayoiS', name: 'portfolio' } }
    : { kind: 'local' },
  ui: { brand: { name: 'Portfolio' } },
  singletons: {
    profile: singleton({
      label: 'Profile & contact',
      path: 'src/content/profile',
      schema: {
        name: fields.text({ label: 'Full name', validation: { isRequired: true } }),
        shortName: fields.text({ label: 'Short name (header)', validation: { isRequired: true } }),
        role: t('Role / job title'),
        photo: image('Photo (square)'),
        photoAlt: t('Photo description (alt text)'),
        location: fields.text({ label: 'Location line under photo' }),
        email: fields.text({ label: 'Email', validation: { isRequired: true } }),
        whatsapp: fields.text({ label: 'WhatsApp number (digits only, e.g. 6282...)' }),
        whatsappMessage: t('WhatsApp prefilled message'),
        linkedin: url('LinkedIn URL'),
        github: url('GitHub URL'),
        seoTitle: t('SEO title'),
        seoDescription: t('SEO description', true),
      },
    }),
    hero: singleton({
      label: 'Hero',
      path: 'src/content/hero',
      schema: {
        available: fields.checkbox({ label: 'Show "taking new projects" badge', defaultValue: true }),
        status: t('Badge text'),
        title: t('Headline — wrap the highlighted words in *asterisks*'),
        lead: t('Intro paragraph', true),
        proof: fields.array(
          fields.object({ value: t('Big value'), text: t('Caption') }),
          { label: 'Highlights', itemLabel: (p) => p.fields.value.fields.en.value },
        ),
      },
    }),
    services: singleton({
      label: 'Services',
      path: 'src/content/services',
      schema: {
        intro: t('Intro', true),
        items: fields.array(
          fields.object({
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Screen', value: 'screen' },
                { label: 'Dashboard', value: 'dashboard' },
                { label: 'Globe', value: 'globe' },
              ],
              defaultValue: 'screen',
            }),
            title: t('Title'),
            description: t('Description', true),
            bullets: fields.array(t('Bullet'), {
              label: 'Bullets',
              itemLabel: (p) => p.fields.en.value,
            }),
          }),
          { label: 'Services', itemLabel: (p) => p.fields.title.fields.en.value },
        ),
      },
    }),
    process: singleton({
      label: 'Process',
      path: 'src/content/process',
      schema: {
        steps: fields.array(
          fields.object({ title: t('Title'), description: t('Description', true) }),
          { label: 'Steps', itemLabel: (p) => p.fields.title.fields.en.value },
        ),
      },
    }),
    about: singleton({
      label: 'About',
      path: 'src/content/about',
      schema: {
        paragraphs: fields.array(t('Paragraph', true), {
          label: 'Paragraphs',
          itemLabel: (p) => p.fields.en.value.slice(0, 60),
        }),
        facts: fields.array(
          fields.object({ label: t('Label'), value: fields.text({ label: 'Value' }) }),
          { label: 'Facts', itemLabel: (p) => p.fields.label.fields.en.value },
        ),
      },
    }),
    contact: singleton({
      label: 'Contact section',
      path: 'src/content/contact',
      schema: { heading: t('Heading'), intro: t('Intro', true) },
    }),
  },
  collections: {
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*',
      slugField: 'slug',
      columns: ['order'],
      schema: {
        slug: fields.slug({ name: { label: 'Internal name (slug)' } }),
        order: fields.integer({ label: 'Order (lower = first)', defaultValue: 10 }),
        title: t('Title'),
        stack: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Tech stack',
          itemLabel: (p) => p.value,
        }),
        problem: t('Problem', true),
        built: t('What I built', true),
        result: t('Result', true),
        image: image('Screenshot (optional)'),
        repoUrl: url('GitHub URL'),
        liveUrl: url('Live URL'),
      },
    }),
  },
});

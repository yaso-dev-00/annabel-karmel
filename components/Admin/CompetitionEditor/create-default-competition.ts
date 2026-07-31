import { createBlock, createBlockId } from '@/lib/content-blocks/defaults';
import type { Competition } from '@/lib/content-blocks/types';
import {
  createFormField,
  createFormRow,
  createFormSection,
} from '@/lib/content-blocks/form-schema/defaults';
import type { CustomFormSchema } from '@/lib/content-blocks/form-schema/types';

function createDefaultCompetitionEntryFormSchema(): CustomFormSchema {
  const nameField = createFormField('text');
  nameField.label = 'Name';
  nameField.name = 'name';
  nameField.placeholder = 'Your name';
  nameField.validation = [{ type: 'required', message: 'Name is required' }];

  const emailField = createFormField('email');
  emailField.label = 'Email address';
  emailField.name = 'email';
  emailField.validation = [
    { type: 'required', message: 'Email is required' },
    { type: 'email' },
  ];

  const consentField = createFormField('checkbox');
  consentField.label = 'Annabel Karmel marketing consent';
  consentField.name = 'marketing_consent';
  consentField.options = [
    {
      id: createBlockId(),
      label:
        'By ticking this box I agree to the Annabel Karmel Privacy Policy and to receive Annabel Karmel emails with our newest competitions, offers, recipes and news. You can unsubscribe at any time.',
      value: 'yes',
    },
  ];
  consentField.validation = [
    { type: 'required', message: 'Consent is required' },
  ];

  const submitButton = createFormField('button');
  submitButton.label = 'Submit';
  submitButton.buttonVariant = 'primary';
  submitButton.buttonAction = 'submit';

  return {
    version: 1,
    title: 'Enter the competition',
    description: 'Complete the form below for your chance to win.',
    submitLabel: 'Submit',
    method: 'post',
    sections: [createFormSection('Your details')].map((section) => ({
      ...section,
      rows: [
        createFormRow(1),
        createFormRow(1),
        createFormRow(1),
        createFormRow(1),
      ].map((row, index) => {
        if (index === 0) return { ...row, fields: [nameField] };
        if (index === 1) return { ...row, fields: [emailField] };
        if (index === 2) return { ...row, fields: [consentField] };
        return { ...row, fields: [submitButton] };
      }),
    })),
    globalStyle: {
      gap: '16px',
      padding: '24px',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      borderColor: '#efd8d8',
    },
  };
}

export function createDefaultCompetitionStarterBlocks() {
  const heading = createBlock('heading', 0);
  heading.data = { level: 'h2', text: 'Win an amazing prize!' };

  const image = createBlock('image', 1);
  image.data = { src: '', alt: 'Competition prize', full_width: true };

  const intro = createBlock('rich_text', 2);
  intro.data = {
    variant: 'body',
    html: '<p>We’ve teamed up with our partners for your chance to WIN an incredible prize package!</p>',
  };

  const prizeHeading = createBlock('heading', 3);
  prizeHeading.data = { level: 'h2', text: 'What you could win' };

  const prizeBody = createBlock('rich_text', 4);
  prizeBody.data = {
    variant: 'body',
    html: '<p>Describe the prize, partner brands, and what makes this competition special.</p>',
  };

  const form = createBlock('form_embed', 5);
  form.data = {
    mode: 'builder',
    schema: createDefaultCompetitionEntryFormSchema(),
  };

  const terms = createBlock('accordion', 6);
  terms.data = {
    default_open: 'none',
    numbered_titles: false,
    panels: [
      {
        id: createBlockId(),
        title: 'Terms & conditions',
        paragraphs:
          '<p>The Prize Draw is open to UK residents only aged 18 and over.</p><p>Employees, their families, agencies or associates of Annabel Karmel and any third parties involved in the preparation and/or performance of this Prize Draw are not eligible for entry.</p><p>The prize cannot be exchanged for cash.</p>',
      },
    ],
  };

  return [heading, image, intro, prizeHeading, prizeBody, form, terms];
}

export function createDefaultCompetition(): Competition {
  const now = new Date().toISOString();
  return {
    id: '',
    slug: '',
    title: 'Untitled competition',
    listing_image: '',
    listing_image_alt: '',
    seo_title: '',
    seo_description: '',
    content_blocks: createDefaultCompetitionStarterBlocks(),
    show_instagram_share: true,
    content_max_width: 'default',
    status: 'draft',
    scheduled_at: null,
    published_at: null,
    closes_at: null,
    created_at: now,
    updated_at: now,
  };
}

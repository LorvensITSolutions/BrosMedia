import { contact, siteName, siteUrl } from './seo'

export const legalUpdated = '26 September 2026'

export const privacyPolicy = {
  title: 'Privacy Policy',
  label: 'Legal',
  summary:
    'How Brosmedia collects, uses, and protects information when you visit our website or work with us.',
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        `${siteName} (“we”, “us”, or “our”) is a digital marketing agency based in ${contact.addressLocality}, ${contact.addressRegion}, India. This Privacy Policy explains how we handle personal information when you use ${siteUrl}, contact us, or engage our services.`,
        `Registered / office address: ${contact.addressDisplay}. Contact: ${contact.email} · ${contact.phoneDisplay}.`,
      ],
    },
    {
      heading: 'Information we collect',
      paragraphs: [
        'We may collect information you provide directly, including your name, email address, phone number, company name, project details, and any message you send through our contact forms, email, WhatsApp, or phone.',
      ],
      bullets: [
        'Usage data such as pages visited, approximate location (city/region), device/browser type, and referring URLs, typically via analytics tools.',
        'Technical data such as IP address and cookies or similar technologies needed for site performance and measurement.',
        'Business records related to proposals, contracts, invoices, and deliverables when you become a client.',
      ],
    },
    {
      heading: 'How we use your information',
      paragraphs: ['We use personal information to:'],
      bullets: [
        'Respond to enquiries and schedule strategy calls.',
        'Provide, manage, and improve our branding, marketing, website, and creative services.',
        'Send project-related communication and, where permitted, occasional updates about our work.',
        'Operate, secure, and analyse our website.',
        'Meet legal, accounting, and compliance obligations.',
      ],
    },
    {
      heading: 'Cookies and analytics',
      paragraphs: [
        'Our website may use cookies or similar technologies for essential functionality, preference storage (such as theme), and performance analytics. You can control cookies through your browser settings. Disabling some cookies may affect how the site works.',
      ],
    },
    {
      heading: 'Sharing of information',
      paragraphs: [
        'We do not sell your personal information. We may share information with trusted service providers who help us operate our business (for example hosting, email, analytics, payment, or collaboration tools), only as needed for those purposes and under appropriate safeguards.',
        'We may also disclose information if required by law, regulation, or legal process, or to protect the rights, safety, and property of Brosmedia, our clients, or others.',
      ],
    },
    {
      heading: 'Data retention',
      paragraphs: [
        'We keep personal information only as long as needed for the purposes described above, including responding to enquiries, delivering services, and meeting legal or accounting requirements. Enquiry data that does not become a project is typically retained for a limited period and then deleted or anonymised.',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, or misuse. No method of transmission or storage is completely secure; please use care when sharing sensitive details online.',
      ],
    },
    {
      heading: 'Your choices and rights',
      paragraphs: [
        'Depending on applicable law, you may request access to, correction of, or deletion of personal information we hold about you, or ask us to limit certain processing. To make a request, email us at the address below. We may need to verify your identity before responding.',
      ],
    },
    {
      heading: 'Third-party links',
      paragraphs: [
        'Our site may link to third-party websites or platforms (including social media and client project links). We are not responsible for the privacy practices of those sites. Please review their policies separately.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'Our services and website are directed at businesses and professionals. We do not knowingly collect personal information from children under 18. If you believe a child has provided us information, contact us and we will take appropriate steps to remove it.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Continued use of the site after updates means you acknowledge the revised policy.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `For privacy questions or requests, contact ${siteName} at ${contact.email} or ${contact.phoneDisplay}, or write to ${contact.addressDisplay}.`,
      ],
    },
  ],
}

export const termsAndConditions = {
  title: 'Terms & Conditions',
  label: 'Legal',
  summary:
    'The terms that apply when you use the Brosmedia website or engage our digital marketing and creative services.',
  sections: [
    {
      heading: 'Agreement',
      paragraphs: [
        `By accessing ${siteUrl} or engaging ${siteName} for services, you agree to these Terms & Conditions. If you do not agree, please do not use the website or our services.`,
        `These terms are governed by the laws of India. Courts in ${contact.addressLocality}, ${contact.addressRegion} shall have exclusive jurisdiction, subject to any mandatory consumer protections that apply.`,
      ],
    },
    {
      heading: 'About our services',
      paragraphs: [
        `${siteName} provides digital marketing and creative services, which may include branding and identity, website design and development, social media, Meta and performance ads, content, video, and related consulting.`,
        'Specific scope, timelines, fees, and deliverables for client work are defined in a proposal, statement of work, invoice, or written agreement between you and Brosmedia. Those documents take precedence over these website terms for the commercial engagement.',
      ],
    },
    {
      heading: 'Website use',
      paragraphs: [
        'You may browse this website for lawful, personal, or business information purposes. You agree not to misuse the site, attempt unauthorised access, disrupt services, scrape content at scale without permission, or use the site in any way that violates applicable law.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        `Unless otherwise stated, website content — including text, graphics, logos, layouts, and branding — is owned by ${siteName} or its licensors and is protected by intellectual property laws.`,
        'For client projects, ownership and licence terms for final deliverables are set out in the relevant proposal or agreement. Until full payment is received, Brosmedia retains all rights in work product and may withhold or revoke usage licences.',
        'You may not copy, reproduce, or commercially exploit website materials without prior written consent, except for fair use or viewing as intended.',
      ],
    },
    {
      heading: 'Enquiries and proposals',
      paragraphs: [
        'Information on this website is for general guidance and does not constitute a binding offer. Quotes and proposals are valid only for the period stated (or a reasonable period if none is stated) and may change if project scope changes.',
      ],
    },
    {
      heading: 'Client responsibilities',
      paragraphs: [
        'When you engage us, you agree to provide accurate brief materials, timely feedback, access credentials, brand assets, and approvals needed to deliver the work. Delays on your side may shift timelines. You confirm you have the rights to materials you supply and that their use will not infringe third-party rights.',
      ],
    },
    {
      heading: 'Payments',
      paragraphs: [
        'Fees, payment schedules, and taxes (including GST where applicable) are as stated in your proposal or invoice. Work may be paused if invoices remain unpaid. Unless otherwise agreed in writing, deposits are non-refundable once work has commenced.',
      ],
    },
    {
      heading: 'Advertising and third-party platforms',
      paragraphs: [
        'Where we manage ads or accounts on platforms such as Meta, Google, or social networks, those platforms’ terms also apply. Results depend on many factors outside our control (including budgets, competition, creative performance, and platform algorithms). We do not guarantee specific rankings, engagement, leads, or revenue outcomes.',
      ],
    },
    {
      heading: 'Confidentiality',
      paragraphs: [
        'Each party should treat non-public business information shared during an engagement as confidential and use it only for delivering or receiving the services, except where disclosure is required by law or already public without breach.',
      ],
    },
    {
      heading: 'Disclaimer',
      paragraphs: [
        'The website is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, Brosmedia disclaims warranties of uninterrupted access, error-free content, or fitness for a particular purpose regarding the website alone.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        `To the maximum extent permitted by applicable law, ${siteName} shall not be liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits, data, or business opportunity arising from use of the website or our services.`,
        'Our aggregate liability for any claim arising from a client engagement shall not exceed the fees paid to Brosmedia for the specific services giving rise to the claim in the three months preceding the claim, except where liability cannot be limited by law (including for fraud or wilful misconduct).',
      ],
    },
    {
      heading: 'Termination',
      paragraphs: [
        'Either party may end a service engagement as set out in the applicable proposal or agreement. Provisions that by nature should survive (including intellectual property, confidentiality, payment for work done, and limitation of liability) continue after termination.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'We may update these Terms & Conditions from time to time. The “Last updated” date on this page will reflect changes. Continued use of the website after updates constitutes acceptance of the revised terms. Material changes to active client agreements will be communicated separately where required.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `Questions about these terms: ${contact.email} · ${contact.phoneDisplay} · ${contact.addressDisplay}.`,
      ],
    },
  ],
}

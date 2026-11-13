// About page + policy content (source: "About Bidyuth 2027 on Webapp", owner: Shreenivas Badada).
// Policy text is kept as supplied; only typos and the broken email address were corrected.

export const OPS_EMAIL = 'operations@bbb-india.com';

export const ABOUT_PAGE = {
  label: 'About Bidyuth 2027',
  title: 'A convergence of',
  titleAccent: 'minds, ideas and opportunities',
  letterLabel: 'A note from the committee',
  salutation: 'Dear Leaders,',
  intro:
    'We are delighted to introduce you to the BBB BIDYUTH 2027 2-Day Business Conclave, an unparalleled gathering set to redefine the landscape of business innovation and collaboration. As the excitement builds for this transformative event, we wanted to provide you with a glimpse into what awaits you over these two dynamic days.',
  overviewLabel: 'Event overview',
  overview:
    "BBB BIDYUTH 2027 Business Conclave is not merely an event, it's a convergence of minds, ideas, and opportunities. Over the course of two days, industry leaders, visionaries, and thought influencers will come together to explore, discuss, and chart the course for the future of business. This conclave is designed to inspire, connect, and empower professionals across diverse sectors.",
  whyLabel: 'Why attend',
  why: [
    'Gain strategic insights from industry leaders.',
    'Network with potential partners and clients.',
    'Stay ahead of emerging trends and innovations.',
    'Participate in interactive discussions and workshops.',
    'Position your business for future success.',
  ],
  closing:
    'We are committed to making BBB BIDYUTH 2027 Business Conclave an unforgettable experience for you. Be prepared to be inspired, informed, and connected. We look forward to welcoming you to this extraordinary gathering of minds.',
  signOff: 'Best Regards,',
  signature: 'Team BIDYUTH 2027',
};

export type Block = string | { h: string } | { list: string[] } | { lead: string; t: string };

export type Policy = { id: string; title: string; meta?: string; blocks: Block[] };

export const POLICIES: Policy[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    blocks: [
      'Protection of Personal Data/Personally Identifiable Information (PII) is important to Bhagyanagar Business Group now on BBB BIDYUTH 2027.',
      'BBB BIDYUTH 2027 adopts reasonable and appropriate security practices and procedures including administrative, physical security and technical controls to safeguard Personal Information/Personally Identifiable Information. We have implemented safeguards including organizational, technical, and physical measures to protect against accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, the personal data/Personally Identifiable Information we possess, process or use.',
      'BBB BIDYUTH 2027 has established this Privacy Policy to protect and control the collection, processing, storage, and/or transmission of such data. This policy is intended to be shared with our customers, vendors, associates, and staff so that they are aware of the policies and practices with respect to Personal Data/Personally Identifiable Information managed by BBB BIDYUTH 2027 while delivering products and services. We urge you to read about our data privacy and information security policy on a periodic basis, because our privacy terms may change without notice anytime, and it is important that you are aware of any changes that might influence your actions and decisions while doing business with BBB BIDYUTH 2027.',

      { h: 'Collecting Personally Identifiable Information (PII)' },
      'At BBB BIDYUTH 2027, we identify, collect, process, store and transmit personally identifiable information (personal information) from customers when they set up an account with us, or when they buy from us, or at the time service is rendered from BBB BIDYUTH 2027 to its customers.',
      'The below personally identifiable information may be collected:',
      { list: ['Full Names', 'Addresses', 'Phone Numbers', 'Email Addresses', 'Payment Related Information*'] },
      '* Your payment transactions or banking information such as credit and debit card details or other information that is required for online payment processing is not processed by BBB BIDYUTH 2027 but is processed by our Payment Gateway partner. BBB BIDYUTH 2027 does not capture, store, or transmit such information.',

      { h: 'Children’s Personal Information' },
      `We do not knowingly collect personal data/Personally Identifiable Information from children (persons who can be defined as children as per applicable laws). If the parents or guardians believe that their child/ward has provided us with personal data without their consent, such parents or guardians can contact us at ${OPS_EMAIL} and we will take steps to delete such personal data/Personally Identifiable Information from our systems.`,

      { h: 'Using Personal Data/Personally Identifiable Information' },
      'Most of your actions such as browsing our website, viewing product / service / activity information, blogs, etc. may be conducted without registration. However, activities such as enrolling, purchasing, customer service, referring to other prospective customers or interested parties require you to register on BBB BIDYUTH 2027.',
      'The Personally Identifiable Information may be used for the following purposes:',
      {
        list: [
          'Deliver products and services.',
          'Provide services such as responses to product queries, handling returns, processing of orders, contacting for providing clarifications, updates, newsletters, and offers.',
        ],
      },
      'BBB BIDYUTH 2027 uses personally identifiable information to provide information about its products and services. If the parties who receive such information wish to stop receiving further content, then the provision to “Opt-out” can be made use of.',
      'Personally Identifiable Information is used to provide the services customers have asked for. Some such services include:',
      {
        list: [
          'Providing product information.',
          'Resolve complaints, escalations, and disputes.',
          'Resolve problems and queries.',
          'Promote our other products and services and for the ongoing improvement of our products and services.',
          'Provide updates.',
          'Quantify or measure customer feedback to customize or improve their experience.',
          'Identify and remediate errors or defects and minimize such occurrences.',
          'Identify, correct, and prevent fraudulent activities, and unlawful activities.',
          'Enforce our business policies, terms, and conditions.',
          'Collect payments/outstanding monies.',
        ],
      },
      { lead: 'Note', t: 'Content produced by end-users from reviews, comments, blogs, messaging services, forums, social media, and endorsements are not covered by this policy, as BBB BIDYUTH 2027 is not responsible for the personal information generated due to activities by end-users.' },

      { h: 'Processing Demographic Data' },
      'Demographic data is identified, collected, and processed to profile user activities and business interactions with BBB BIDYUTH 2027 via its websites. The IP addresses of users will be identified for purposes such as diagnosing and troubleshooting server and connectivity problems, and for website administration.',
      'We will sometimes ask you to complete surveys (not compulsory). Such surveys may request you for contact information and some basic personal information (such as location, gender, age-range, and income status). Such data will be utilized to customize your experience with BBB BIDYUTH 2027. To this effect, we may send content that we presume may be of interest and use to you or to render information to suit your preferences.',

      { h: 'Consequences of Not Providing Personal Data/PII/PHI' },
      'If an individual chooses not to provide their personal information that is mandatory to process a request, service, or order then, BBB BIDYUTH 2027 may not be able to execute the same or may be restricted from completing it satisfactorily.',

      { h: 'Using Cookies and Other Technologies' },
      'We use various technologies to collect information on BBB BIDYUTH 2027 websites.',
      { lead: 'Cookies', t: 'When an individual visits a BBB BIDYUTH 2027 website, we may assign the computer one or more “cookies.” A cookie is a small text file that contains information that can later be read by BBB BIDYUTH 2027 to facilitate access to the site and personalize the online experience. For example, when an individual signs into a BBB BIDYUTH 2027 site, we may record his/her user ID in a cookie file on the individual’s computer. In addition, through the use of a cookie, we may automatically collect information about the online activity on a BBB BIDYUTH 2027 site, such as the web pages visited, the links clicked, and the searches conducted. Most browsers automatically accept cookies; however, an individual can usually modify the browser setting to decline cookies by visiting the Help section of the browser’s toolbar. If an individual chooses to decline cookies, please note that he/she may not be able to sign in or use some of the interactive features offered on BBB BIDYUTH 2027 websites.' },
      { lead: 'Other technologies', t: 'BBB BIDYUTH 2027 may use standard Internet technology such as Web beacons (also called clear GIFs or pixel tags) and similar technologies, to deliver or communicate with cookies and track usage of its sites. We may also include Web beacons in e-mail messages or newsletters to determine whether messages have been opened and acted upon. The information we obtain in this manner enables us to customize the services we offer and measure the overall effectiveness of our online content, advertising campaigns, and the products and services offered through the website. Also, we use cookies to provide social media features and to analyze our traffic.' },

      { h: 'Sharing of Personal Information' },
      'We share Personal Data/Personally Identifiable Information (as per business needs) with:',
      { list: ['BBB BIDYUTH 2027 Employees (for internal purposes)', 'Third parties and affiliates'] },
      'Purposes for sharing personal information/Personally Identifiable Information with third parties:',
      {
        list: [
          'To provide us with information security services to help identify, remediate, and prevent criminal activities.',
          'To minimize abuse of our product and service offerings.',
          'To ensure compliance with regulatory or legal demands within reason. Personal Data/Personally Identifiable Information may have to be shared with enforcement authorities if required.',
          'To apply our business terms or Privacy Policy; to act upon assertions on our commercial efforts, or any content from BBB BIDYUTH 2027 stating the breach of the rights of any party, or to protect the rights, property or safety of our customers and associates.',
          'To enable processing of data by third parties on behalf of BBB BIDYUTH 2027 for co-branding of products or services, marketing, analytical and promotional purposes.',
        ],
      },
      'Third parties that process Personal Information/Personally Identifiable Information on behalf of BBB BIDYUTH 2027 for marketing, analytical and promotional purposes shall be bound by our privacy policy and will only act upon such data where the users would have given their explicit consent by opting-in and thereby positively affirming their acceptance to render their personal data/personally identifiable information for such purposes. BBB BIDYUTH 2027 protects the confidentiality, availability, and integrity of subscriber information. Such information shall be used only for the purposes stated at the time of collection and will not be rented, sold, or provided to external parties for any other purposes than what has been stated.',

      { h: 'Links to Other External Sites' },
      'BBB BIDYUTH 2027 websites may lead to other external websites that may collect your personal data/personally identifiable information.',
      'BBB BIDYUTH 2027 claims no responsibility to the content, privacy practices or policies of such websites.',

      { h: 'Corrections Regarding Personal Data/Personally Identifiable Information & Opt-out' },
      `Users can request us to correct or delete personal data/Personally Identifiable Information that we hold, including profile and preferences. If you are no longer interested in receiving updates or other marketing information from us, or if you want us to remove any Personal Information/Personally Identifiable Information that we have collected about you, then please e-mail your requests to ${OPS_EMAIL}. We take up to 30 days to process your request and confirm the status of the action requested.`,
    ],
  },
  {
    id: 'refund',
    title: 'Refund Policy',
    blocks: [
      'The Delegate participation and Stall Fee collected during the delegate registration for the BIDYUTH Event:',
      {
        list: [
          'Is not refundable under any circumstances.',
          'Is not transferrable to a 3rd party unrelated to the Member.',
          'Is not negotiable against any external / internal influences or recommendations.',
        ],
      },
      'All disputes are subject to Hyderabad (Telangana, India) jurisdiction.',
      'We also encourage you to read our “Terms of Service” on our website www.bidyuth.com before the delegate registration process.',
    ],
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    meta: 'Last revision: 19/11/2026',
    blocks: [
      'PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY. BY USING THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.',
      'This Terms of Service Agreement (the “Agreement”) governs your use of this website, bidyuth.com (the “Website”), Bhagyanagar Business Group (“BBB BIDYUTH 2027”) offer of products for purchase on this Website, or your purchase of products available on this Website. This Agreement includes, and incorporates by this reference, the policies and guidelines referenced below. BBB BIDYUTH 2027 reserves the right to change or revise the terms and conditions of this Agreement at any time by posting any changes or a revised Agreement on this Website. BBB BIDYUTH 2027 will alert you that changes or revisions have been made by indicating on the top of this Agreement the date it was last revised. The changed or revised Agreement will be effective immediately after it is posted on this Website. Your use of the Website following the posting of any such changes or of a revised Agreement will constitute your acceptance of any such changes or revisions. BBB BIDYUTH 2027 encourages you to review this Agreement whenever you visit the Website to make sure that you understand the terms and conditions governing use of the Website. This Agreement does not alter in any way the terms or conditions of any other written agreement you may have with BBB BIDYUTH 2027 for other products or services. If you do not agree to this Agreement (including any referenced policies or guidelines), please immediately terminate your use of the Website. If you would like to print this Agreement, please click the print button on your browser toolbar.',

      { h: '1. Products' },
      { lead: 'Terms of Offer', t: 'This Website offers for sale certain products (the “Products”). By placing an order for Products through this Website, you agree to the terms set forth in this Agreement.' },
      { lead: 'Customer Solicitation', t: 'Unless you notify our third party call center reps or direct BBB BIDYUTH 2027 sales reps, while they are calling you, of your desire to opt out from further direct company communications and solicitations, you are agreeing to continue to receive further emails and call solicitations from BBB BIDYUTH 2027 and its designated in house or third party call team(s).' },
      { lead: 'Opt Out Procedure', t: 'We provide 3 easy ways to opt out from future solicitations:' },
      {
        list: [
          'You may use the opt out link found in any email solicitation that you may receive.',
          `You may also choose to opt out, via sending your email address to: ${OPS_EMAIL}.`,
          'You may send a written remove request to The Forum of Business By Brahmins (TRUST), No: 1549, Near Sangama Circle, Hebbal 2nd Stage, Mysore.',
        ],
      },
      { lead: 'Proprietary Rights', t: 'BBB BIDYUTH 2027 has proprietary rights and trade secrets in the Products. You may not copy, reproduce, resell or redistribute any Product manufactured and/or distributed by BBB BIDYUTH 2027. BBB BIDYUTH 2027 also has rights to all trademarks and trade dress and specific layouts of this webpage, including calls to action, text placement, images and other information.' },
      { lead: 'Taxes', t: 'If you purchase any Products, you will be responsible for paying any applicable taxes.' },

      { h: '2. Website' },
      { lead: 'Content; Intellectual Property; Third Party Links', t: 'In addition to making Products available, this Website also offers information and marketing materials. This Website also offers information, both directly and through indirect links to third-party websites. BBB BIDYUTH 2027 does not always create the information offered on this Website; instead, the information is often gathered from other sources. To the extent that BBB BIDYUTH 2027 does create the content on this Website, such content is protected by intellectual property laws of India, foreign nations, and international bodies. Unauthorized use of the material may violate copyright, trademark, and/or other laws. You acknowledge that your use of the content on this Website is for personal, noncommercial use. Any links to third-party websites are provided solely as a convenience to you. BBB BIDYUTH 2027 does not endorse the contents on any such third-party websites. BBB BIDYUTH 2027 is not responsible for the content of or any damage that may result from your access to or reliance on these third-party websites. If you link to third-party websites, you do so at your own risk.' },
      { lead: 'Use of Website', t: 'BBB BIDYUTH 2027 is not responsible for any damages resulting from use of this website by anyone. You will not use the Website for illegal purposes. You will (1) abide by all applicable local, state, national, and international laws and regulations in your use of the Website (including laws regarding intellectual property), (2) not interfere with or disrupt the use and enjoyment of the Website by other users, (3) not resell material on the Website, (4) not engage, directly or indirectly, in transmission of “spam”, chain letters, junk mail or any other type of unsolicited communication, and (5) not defame, harass, abuse, or disrupt other users of the Website.' },
      { lead: 'License', t: 'By using this Website, you are granted a limited, non-exclusive, non-transferable right to use the content and materials on the Website in connection with your normal, noncommercial, use of the Website. You may not copy, reproduce, transmit, distribute, or create derivative works of such content or information without express written authorization from BBB BIDYUTH 2027 or the applicable third party (if third party content is at issue).' },
      { lead: 'Posting', t: 'By posting, storing, or transmitting any content on the Website, you hereby grant BBB BIDYUTH 2027 a perpetual, worldwide, non-exclusive, royalty-free, assignable, right and license to use, copy, display, perform, create derivative works from, distribute, have distributed, transmit and assign such content in any form, in all media now known or hereinafter created, anywhere in the world. BBB BIDYUTH 2027 does not have the ability to control the nature of the user-generated content offered through the Website. You are solely responsible for your interactions with other users of the Website and any content you post. BBB BIDYUTH 2027 is not liable for any damage or harm resulting from any posts by or interactions between users. BBB BIDYUTH 2027 reserves the right, but has no obligation, to monitor interactions between and among users of the Website and to remove any content BBB BIDYUTH 2027 deems objectionable.' },

      { h: 'Disclaimer of Warranties' },
      'YOUR USE OF THIS WEBSITE AND/OR PRODUCTS ARE AT YOUR SOLE RISK. THE WEBSITE AND PRODUCTS ARE OFFERED ON AN “AS IS” AND “AS AVAILABLE” BASIS. BBB BIDYUTH 2027 EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT WITH RESPECT TO THE PRODUCTS OR WEBSITE CONTENT, OR ANY RELIANCE UPON OR USE OF THE WEBSITE CONTENT OR PRODUCTS. (“PRODUCTS” INCLUDE TRIAL PRODUCTS.)',
      'WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, BBB BIDYUTH 2027 MAKES NO WARRANTY:',
      {
        list: [
          'THAT THE INFORMATION PROVIDED ON THIS WEBSITE IS ACCURATE, RELIABLE, COMPLETE, OR TIMELY.',
          'THAT THE LINKS TO THIRD-PARTY WEBSITES ARE TO INFORMATION THAT IS ACCURATE, RELIABLE, COMPLETE, OR TIMELY.',
          'NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM THIS WEBSITE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN.',
          'AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE PRODUCTS OR THAT DEFECTS IN PRODUCTS WILL BE CORRECTED.',
          'REGARDING ANY PRODUCTS PURCHASED OR OBTAINED THROUGH THE WEBSITE.',
        ],
      },
      'SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.',

      { h: '3. Limitation of Liability' },
      'BBB BIDYUTH 2027’S ENTIRE LIABILITY, AND YOUR EXCLUSIVE REMEDY, IN LAW, IN EQUITY, OR OTHERWISE, WITH RESPECT TO THE WEBSITE CONTENT AND PRODUCTS AND/OR FOR ANY BREACH OF THIS AGREEMENT IS SOLELY LIMITED TO THE AMOUNT YOU PAID, LESS SHIPPING AND HANDLING, FOR PRODUCTS PURCHASED VIA THE WEBSITE.',
      'BBB BIDYUTH 2027 WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES IN CONNECTION WITH THIS AGREEMENT OR THE PRODUCTS IN ANY MANNER, INCLUDING LIABILITIES RESULTING FROM (1) THE USE OR THE INABILITY TO USE THE WEBSITE CONTENT OR PRODUCTS; (2) THE COST OF PROCURING SUBSTITUTE PRODUCTS OR CONTENT; (3) ANY PRODUCTS PURCHASED OR OBTAINED OR TRANSACTIONS ENTERED INTO THROUGH THE WEBSITE; OR (4) ANY LOST PROFITS YOU ALLEGE.',
      'SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.',

      { h: '4. Indemnification' },
      'You will release, indemnify, defend and hold harmless BBB BIDYUTH 2027, and any of its contractors, agents, employees, officers, directors, shareholders, affiliates and assigns from all liabilities, claims, damages, costs and expenses, including reasonable attorneys’ fees and expenses, of third parties relating to or arising out of (1) this Agreement or the breach of your warranties, representations and obligations under this Agreement; (2) the Website content or your use of the Website content; (3) the Products or your use of the Products (including Trial Products); (4) any intellectual property or other proprietary right of any person or entity; (5) your violation of any provision of this Agreement; or (6) any information or data you supplied to BBB BIDYUTH 2027. When BBB BIDYUTH 2027 is threatened with suit or sued by a third party, BBB BIDYUTH 2027 may seek written assurances from you concerning your promise to indemnify BBB BIDYUTH 2027; your failure to provide such assurances may be considered by BBB BIDYUTH 2027 to be a material breach of this Agreement. BBB BIDYUTH 2027 will have the right to participate in any defense by you of a third-party claim related to your use of any of the Website content or Products, with counsel of BBB BIDYUTH 2027’s choice at its expense. BBB BIDYUTH 2027 will reasonably cooperate in any defense by you of a third-party claim at your request and expense. You will have sole responsibility to defend BBB BIDYUTH 2027 against any claim, but you must receive BBB BIDYUTH 2027’s prior written consent regarding any related settlement. The terms of this provision will survive any termination or cancellation of this Agreement or your use of the Website or Products.',

      { h: '5. Privacy' },
      'BBB BIDYUTH 2027 believes strongly in protecting user privacy and providing you with notice of BBB BIDYUTH 2027’s use of data. Please refer to the BBB BIDYUTH 2027 Privacy Policy, incorporated by reference herein, that is posted on the Website.',

      { h: '6. Agreement to be Bound' },
      'By using this Website or ordering Products, you acknowledge that you have read and agree to be bound by this Agreement and all terms and conditions on this Website.',

      { h: 'General' },
      { lead: 'Force Majeure', t: 'BBB BIDYUTH 2027 will not be deemed in default hereunder or held responsible for any cessation, interruption or delay in the performance of its obligations hereunder due to earthquake, flood, fire, storm, natural disaster, act of God, war, terrorism, armed conflict, labor strike, lockout, or boycott.' },
      { lead: 'Cessation of Operation', t: 'BBB BIDYUTH 2027 may at any time, in its sole discretion and without advance notice to you, cease operation of the Website and distribution of the Products.' },
      { lead: 'Entire Agreement', t: 'This Agreement comprises the entire agreement between you and BBB BIDYUTH 2027 and supersedes any prior agreements pertaining to the subject matter contained herein.' },
      { lead: 'Effect of Waiver', t: 'The failure of BBB BIDYUTH 2027 to exercise or enforce any right or provision of this Agreement will not constitute a waiver of such right or provision. If any provision of this Agreement is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties’ intentions as reflected in the provision, and the other provisions of this Agreement remain in full force and effect.' },
      { lead: 'Governing Law; Mysuru', t: 'This Website originates from Mysuru, Karnataka. This Agreement will be governed by the laws of the State of Karnataka without regard to its conflict of law principles to the contrary. Neither you nor BBB BIDYUTH 2027 will commence or prosecute any suit, proceeding or claim to enforce the provisions of this Agreement, to recover damages for breach of or default of this Agreement, or otherwise arising under or by reason of this Agreement, other than in courts located in the State of Karnataka. By using this Website or ordering Products, you consent to the jurisdiction and venue of such courts in connection with any action, suit, proceeding, or claim arising under or by reason of this Agreement. You hereby waive any right to trial by jury arising out of this Agreement and any related documents.' },
      { lead: 'Statute of Limitation', t: 'You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Website or Products or this Agreement must be filed within one (1) year after such claim or cause of action arose or be forever barred.' },
      { lead: 'Waiver of Class Action Rights', t: 'BY ENTERING INTO THIS AGREEMENT, YOU HEREBY IRREVOCABLY WAIVE ANY RIGHT YOU MAY HAVE TO JOIN CLAIMS WITH THOSE OF OTHERS IN THE FORM OF A CLASS ACTION OR SIMILAR PROCEDURAL DEVICE. ANY CLAIMS ARISING OUT OF, RELATING TO, OR CONNECTION WITH THIS AGREEMENT MUST BE ASSERTED INDIVIDUALLY.' },
      { lead: 'Termination', t: 'BBB BIDYUTH 2027 reserves the right to terminate your access to the Website if it reasonably believes, in its sole discretion, that you have breached any of the terms and conditions of this Agreement. Following termination, you will not be permitted to use the Website and BBB BIDYUTH 2027 may, in its sole discretion and without advance notice to you, cancel any outstanding orders for Products. If your access to the Website is terminated, BBB BIDYUTH 2027 reserves the right to exercise whatever means it deems necessary to prevent unauthorized access of the Website. This Agreement will survive indefinitely unless and until BBB BIDYUTH 2027 chooses, in its sole discretion and without advance notice to you, to terminate it.' },
      { lead: 'Domestic Use', t: 'BBB BIDYUTH 2027 makes no representation that the Website or Products are appropriate or available for use in locations outside India. Users who access the Website from outside India do so at their own risk and initiative and must bear all responsibility for compliance with any applicable local laws.' },
      { lead: 'Assignment', t: 'You may not assign your rights and obligations under this Agreement to anyone. BBB BIDYUTH 2027 may assign its rights and obligations under this Agreement in its sole discretion and without advance notice to you.' },
      'BY USING THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.',
    ],
  },
];

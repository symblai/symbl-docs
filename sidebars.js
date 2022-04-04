module.exports = {
 // Main doc Nav
 
 docs: [{
  id: "introduction",
  type: "doc",
},
{
 type: "doc",
 id: "what-is-symbl",
},
{
  label: "Speech-to-text",
  type: 'category',
  items: [
    'conversation-api/concepts/speech-to-text',
    'how-tos/get-speech-to-text-real-time',
    'how-tos/get-speech-to-text-async',
  ]
},
{
  label: "Topics",
  type: 'category',
  items: [
    'conversation-api/concepts/topics',
    'how-tos/how-to-get-topics',
    {
      type: 'doc',
      id: 'how-tos/how-to-get-topics',
      customProps: {
        hash: '#async-api',
        label: 'Async Topics',
      }
    },
  ],
},
{
  label: "Abstract Topics (Labs)",
  type: 'category',
  items: [
    'guides/abstract-topics',
  ],
},
{
  label: "Sentiment Analysis (Beta)",
  type: 'category',
  items: [
    'conversation-api/concepts/sentiment',
    'how-tos/how-to-get-sentiment-analysis',
    {
      type: 'doc',
      id: 'how-tos/how-to-get-sentiment-analysis',
      customProps: {
        hash: '#async-api',
        label: 'Async Sentiment Analysis',
      }
    },
  ],
},
{
  label: "Action Items & Follow Ups",
  type: 'category',
  items: [
    'conversation-api/concepts/action-items',
    'conversation-api/concepts/follow-ups',
  ]
},
{
 label: "Questions",
 type: 'category',
 items: [
   'conversation-api/concepts/questions',
 ]
},
{
  label: "Trackers (Beta)",
  type: 'category',
  items: [
    'conversation-api/concepts/trackers',
  ]
},

{
  label: "Conversation Analytics",
  type: 'category',
  items: [
    'conversation-api/concepts/analytics',
  ]
},
{
  label: "Topic Hierarchy (Beta)",
  type: 'category',
  items: [
    'conversation-api/concepts/topic-hierarchy',
  ]
},
{
  label: "Summarization (Alpha)",
  type: 'category',
  items: [
    'conversation-api/concepts/summarization',
  ]
},
{
  label: "Comprehensive Action Items (Labs)",
  type: 'category',
  items: [
    'conversation-api/concepts/comprehensive-action-items',
  ]
},
{
  label: "Conversation Groups (Beta)",
  type: 'category',
  items: [
    'conversation-api/concepts/conversation-groups',
  ]
},
{
 label: "Pre-built UI",
 type: 'category',
 items: [
  'conversation-api/concepts/ui-components',
  'pre-built-ui/text-summary-ui',
  'pre-built-ui/video-summary-ui',
  'pre-built-ui/trackers-and-analytics-ui',
  'pre-built-ui/symbl-elements',
 
 ]
},
{
  type: "doc",
  id: "faq"
},
{
 label: "Pre-Built UI",
 type: 'category',
 collapsed: true,
 items: [
   'pre-built-ui/text-summary-ui',
   'pre-built-ui/experience-api',
   'pre-built-ui/trackers-and-analytics-ui',
   // 'pre-built-ui/summary-ui',
   'pre-built-ui/symbl-elements',
 
 ]
},
],

//API Reference Sidebar
ApiSidebar: [
  {
type: 'doc',
id: 'api-reference/api-getting-started',
},
{
type: 'doc',
id: 'api-reference/getting-conversation-intelligence',
},
{
type: 'doc',
id: 'developer-tools/authentication',
},
{
  type: 'category',
  label: 'Streaming API',
    items: [
      {
        type: 'doc',
        id: 'streamingapi/introduction',
      }, 
      {
      type: 'doc',
      id: 'streamingapi/reference/api-reference',
      customProps: {
        hash: '#request-parameters',
        label: 'Request Parameters',
      }
    },
    {
      type: 'doc',
      id: 'streamingapi/reference/api-reference',
      customProps: {
        hash: '#connection-establishment',
        label: 'Connection Establishment',
      }
    },
    {
      type: 'doc',
      id: 'streamingapi/reference/api-reference',
      customProps: {
        hash: '#messages',
        label: 'Messages',
      }
    },
    {
      type: 'doc',
      id: 'streamingapi/reference/api-reference',
      customProps: {
        hash: '#using-trackers',
        label: 'Using Trackers'
      }
    },
 {
   label: "Subscribe API (Beta)",
   type: 'category',
   items: [
     'subscribe',
       ],
 },
]
},

{
label: 'Async APIs',
type: 'category',
collapsed: true,
items: [
 'async-api/introduction',
{
  type: 'category',
  label: 'Text API',
  items: [
    'async-api/overview/text/post-text',
    'async-api/overview/text/put-text'
  ],

},
{
  type: 'category',
  label: 'Audio API',
  items: [
    'async-api/overview/audio/post-audio',
    'async-api/overview/audio/put-audio',
    'async-api/overview/audio/post-audio-url',
    'async-api/overview/audio/put-audio-url'
  ],

},
{
  type: 'category',
  label: 'Video API',
  items: [
    'async-api/overview/video/post-video',
    'async-api/overview/video/put-video',
    'async-api/overview/video/post-video-url',
    'async-api/overview/video/put-video-url'
  ],
},
{
  type: 'doc',
  id: 'async-api/reference/supported-languages',
},
{
  id: "async-api/overview/jobs-api",
  type: "doc",
},
]
},

{
label: 'Telephony API',
type: 'category',
  items: [
    {
      type: 'doc',
      id: 'telephony/introduction',
    },
    {
      type: 'doc',
      id: 'telephony/reference/api-reference',
      customProps: {
        hash: '#endpoint',
        label: 'Endpoint',
      },
    },
    {
      type: 'doc',
      id: 'telephony/reference/api-reference',
      customProps: {
        hash: '#request-parameters',
        label: 'Request Parameters',
      },
    },
    {
      type: 'doc',
      id: 'telephony/reference/api-reference',
      customProps: {
        hash: '#response-parameters',
        label: 'Response Parameters',
      },
    },
    {
      type: 'doc',
      id: 'telephony/reference/api-reference',
      customProps: {
        hash: '#specifying-timezones',
        label: 'Specifying Timezones',
      },
    },
  ],
},


{
label: "Conversation APIs",
type: 'category',
collapsed: true,
items: [
'conversation-api/introduction',
    'conversation-api/api-reference/messages',
    'conversation-api/api-reference/action-items',
    'conversation-api/api-reference/follow-ups',
    'conversation-api/api-reference/topics',
    'api-reference/get-abstract-topics',
    'conversation-api/api-reference/questions',
    'conversation-api/api-reference/entities',
    'conversation-api/api-reference/analytics',
    'conversation-api/api-reference/conversation',
    'conversation-api/api-reference/all-conversations',
    'conversation-api/api-reference/put-all-conversations',
    'conversation-api/api-reference/delete',
    'conversation-api/api-reference/members',
    'conversation-api/api-reference/update-members',
    'conversation-api/api-reference/speakers',
    'conversation-api/api-reference/transcript',
    'conversation-api/api-reference/trackers',
    'conversation-api/api-reference/summary'

  ],
},
{
  type: 'category',
  label: 'Experience API',
  items: [
    'api-reference/experience-api/post-text-summary-ui',
    'api-reference/experience-api/post-video-summary-ui',
    'api-reference/experience-api/post-trackers-and-analytics-ui',
    
  ],

},
{
  label: "Trackers APIs (Beta)",
  type: 'category',
  items: [
   'management-api/trackers/trackers-overview',
   'management-api/trackers/create-tracker',
   'management-api/trackers/get-tracker',
   'management-api/trackers/update-tracker',
   'management-api/trackers/delete-tracker',
     ],
  },
{
label: 'Management API (Beta)',
type: 'category',
items: [
'management-api/introduction',
]
},

{
  label: "Conversation Groups APIs (Beta)",
  type: 'category',
  items: [
    'management-api/conversation-groups/conversation-groups-intro',
    'management-api/conversation-groups/create-conversation-groups',
    'management-api/conversation-groups/get-conversation-groups',
    'management-api/conversation-groups/update-conversation-groups',
    'management-api/conversation-groups/delete-conversation-groups',
     ],
  },
{
type: 'doc',
id: 'developer-tools/errors',
},
{
type: 'doc',
id: 'developer-tools/postman',
},
{
  type: 'doc',
  id: 'developer-tools/sample-apps',
  },
{
type: 'doc',
id: 'developer-tools/postman',
},
],

 // Tutorials
 
 TutorialSidebar: [{
  id: "tutorials-page",
  type: "doc",
},
{
  label: 'Streaming API',
  type: 'category',
  collapsed: true,
  items: [
    'streamingapi/code-snippets/start-and-stop-streaming-api-connection',
    'streamingapi/tutorials/get-real-time-transcription',
    'streamingapi/tutorials/get-real-time-data',
    'streamingapi/tutorials/get-real-time-sentiment-analysis',
    'streamingapi/code-snippets/detect-key-phrases',
    'streamingapi/code-snippets/receive-live-captioning',
    'streamingapi/code-snippets/receive-live-topics',
    'streamingapi/code-snippets/receive-ai-insights',
    'streamingapi/code-snippets/receive-speech-to-text-for-different-languages',
    'streamingapi/code-snippets/receive-trackers-in-spanish',
  ],
},
{
  label: 'Async APIs',
  type: 'category',
  collapsed: true,
  items: [
    'async-api/code-snippets/how-to-use-sentiment-analysis',
    'async-api/code-snippets/track-phrases-in-a-conversation',
    'async-api/tutorials/generate-pre-built-ui-from-video-recordings',
    'async-api/code-snippets/receive-conversation-analytics',
    'async-api/tutorials/get-speaker-separation-audio-video',
    'async-api/code-snippets/receive-entities',
    'async-api/code-snippets/receive-speech-to-text-and-ai-insights',
    'async-api/code-snippets/sentiment-analysis-on-topics',
    'async-api/code-snippets/sentiment-analysis-on-messages', 
  ],
},
{
  label: 'Telephony API',
  type: 'category',
  collapsed: true,
  items: [
    'telephony/tutorials/connect-to-zoom-with-telephony-api',
    'telephony/tutorials/get-live-transcription',
    'telephony/code-snippets/connect-to-pstn',
    'telephony/code-snippets/connect-to-sip',
    'telephony/code-snippets/receive-speech-to-text-for-a-different-language',
    'telephony/code-snippets/receive-prebuilt-ui-email-after-conversation',
  ],
},
{
  label: 'Summary API (Alpha)',
  type: 'category',
  collapsed: true,
  items: [
    'tutorials/summarization/getting-summary',
    'tutorials/summarization/refreshing-summary',
    'tutorials/summarization/adding-speaker-info',
  ],
},
{
  label: 'Trackers API (Beta)',
  type: 'category',
  collapsed: true,
  items: [
    'tutorials/trackers/create-trackers-async-api',
    'tutorials/trackers/create-trackers-streaming-api',
    'tutorials/trackers/consuming-trackers-async-api',
    'tutorials/trackers/consuming-trackers-streaming-api',
    'tutorials/trackers/consuming-trackers-management-api',
    'best-practices/best-practices-trackers',
  ],
},
 {
  label: "Pre-built UI",
  type: "category",
  items: [
    {
      type: 'category',
      label: 'Creating Pre-built UI',
      items: [
            'tutorials/pre-built-summary-ui/creating-text-summary-ui',
            'tutorials/pre-built-summary-ui/creating-video-summary-ui',
            'tutorials/pre-built-summary-ui/creating-trackers-and-analytics-ui'

      ],
    },
    {
      type: 'category',
      label: 'Tuning',
      items: [
            'pre-built-ui/tuning-summary-page',
      ],
    },
    {
      type: 'category',
      label: 'Whitelabelling',
      items: [
          'tutorials/pre-built-summary-ui/whitelabeling-summary-ui',
          'pre-built-ui/custom-domain',
      ],
    },
    {
      type: 'category',
      label: 'User Engagement Analytics',
      items: [
        'pre-built-ui/user-engagement-analytics',
        'pre-built-ui/supported-tracking-events',
      ],
    },
    ],
  },


{
  label: 'Concepts',
  type: 'category',
  collapsed: true,
  items: [
    "streamingapi/concepts",
   "telephony/concepts/concepts",
  ],
},
// this is a duplicate code because the code is buggy
{
  label: 'Concepts',
  type: 'category',
  collapsed: true,
  items: [
    "streamingapi/concepts",
   "telephony/concepts/concepts",
  ],
},

],

// Integrations Tab

IntegrationsSidebar: [
  {
  id: "integrations/integrations-intro",
  type: "doc",
},
{
  type: 'doc',
  id: 'integrations/agora-sdk-plugin',
 },
 {
  label: 'Agora SDK Plugin',
  type: 'category',
  collapsed: true,
  items: [
    'integrations/agora-sdk-plugin',
  ],
 },
],

// SDK Tab
SDKsidebar: [{
  id: "sdk-intro",
  type: "doc",
 },
 {
  label: "Javascript SDK",
  collapsed: false,
  type: "category",
  items: [
    'javascript-sdk/overview/introduction',
    {
      type: 'category',
      label: 'Telephony API',
      items: [{
          type: 'category',
          label: 'Tutorials',
          items: [
            'javascript-sdk/tutorials/get-real-time-transcription-js-sdk',
            'javascript-sdk/tutorials/pass-audio-codecs',
            'javascript-sdk/tutorials/push-speakerevents-get-summary-url',
          ],
        },
        {
          type: 'category',
          label: 'Code Snippets',
          items: [
            'javascript-sdk/overview/connect-to-endpoints',
            'javascript-sdk/overview/active-speaker-events',
            'javascript-sdk/telephony/code-snippets/use-languages-timezones-with-sdk'
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Streaming API',
      items: [
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'javascript-sdk/tutorials/push-audio-get-real-time-data',
          ],
        },
        {
          type: 'category',
          label: 'Code Snippets',
          items: [
            'javascript-sdk/overview/subscribe-real-time',
            'javascript-sdk/overview/streaming-audio-real-time',
            'javascript-sdk/streaming/code-snippets/use-languages-with-sdk'
          ],
        }
      ]
    },
    {
      type: 'category',
      label: 'Javascript SDK Reference',
      items: [
        {
          type: 'doc',
          id:'javascript-sdk/reference/api-reference',
          customProps: {
            hash: '#public-methods',
            label: 'Public Methods',
          },
        },
        {
          type: 'doc',
          id:'javascript-sdk/reference/api-reference',
          customProps: {
            hash: '#event-handlers-1',
            label: 'Event Handlers',
          },
        }
      ]
    }
  ]
 },
 
 {
    label: "Python SDK",
    type: "category",
    collapsed: false,
    items: [
      'python-sdk/python-sdk',
      {
        type: 'category',
        label: 'Telephony API',
        items: [
          'python-sdk/python-sdk-telephony-api',
          'python-sdk/python-sdk-telephony-sip',
        ],
      },
      {
        type: 'doc',
        id: 'python-sdk/python-streaming-api',
      },
     {
        type: 'category',
        label: 'Async API',
        items: [
          'python-sdk/python-sdk-async-api',
          'python-sdk/python-sdk-async-audio',
          'python-sdk/python-sdk-async-video'
        ]
      },
      {
        type: 'doc',
        id: 'python-sdk/python-conversation-api',
      },
      {
        type: 'doc',
        id: 'python-sdk/python-sdk-reference',
      },
    ]
  },
  {
    type: 'doc',
    id: 'python-sdk/python-sdk-reference', // added because of buggy code
  },
 ],


// Labs

LabsSidebar: [{
  id: "labs-intro",
  type: "doc",
 },
 {
  label: 'Comprehensive Action Items',
  type: 'category',
  collapsed: true,
  items: [
    'conversation-api/api-reference/comprehensive-action-items',
    ],
 },
 {
  label: 'PII and PCI Identification and Redaction',
  type: 'category',
  collapsed: true,
  items: [
    'conversation-api/concepts/redaction-pii',
  ],
 },
 {
  label: 'Abstract Topics',
  type: 'category',
  collapsed: true,
  items: [
    'labs/abstract-topics-labs',
  ],
 },
  
 // this is a duplicate as the code is buggy
 {
  label: 'PII Identification and Redaction',
  type: 'category',
  collapsed: true,
  items: [
    'conversation-api/concepts/redaction-pii',
  ],
 },
 ],

// Support Tab
Communitysidebar: [{
  id: "support",
  type: "doc",
 },
 ],
 
// Changelog
ChangelogSidebar: [{
  id: "changelog",
  type: "doc",
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#14-march-2022',
    label: '14 March 2022',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#8-feb-2022',
    label: '8 Feb 2022',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#31-jan-2022',
    label: '31 Jan 2022',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#13-jan-2022',
    label: '13 Jan 2022',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#11-jan-2022',
    label: '11 Jan 2022',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#10-jan-2022',
    label: '10 Jan 2022',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#28-dec-2021',
    label: '28 Dec 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#26-nov-2021',
    label: '26 Nov 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#22-oct-2021',
    label: '22 Oct 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#14-oct-2021',
    label: '14 Oct 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#8-oct-2021',
    label: '8 Oct 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#4-oct-2021',
    label: '4 Oct 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#21-sep-2021',
    label: '21 Sept 2021',
  }
},

{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#13-sep-2021',
    label: '13 Sept 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#9-sep-2021',
    label: '9 Sept 2021',
  }
},

{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#2-sept-2021',
    label: '2 Sept 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#19-aug-2021',
    label: '19 Aug 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#9-aug-2021',
    label: '9 Aug 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#30-july-2021',
    label: '30 July 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#13-july-2021',
    label: '13 July 2021',
  }
},
{
  type: 'doc',
  id: 'changelog',
  customProps: {
    hash: '#29-june-2021',
    label: '29 June 2021',
  }
},
{
  type: 'doc',
  id: "changelog",
  customProps: {
    hash: '#31-may-2021',
    label: '31 May 2021',
  }
},
{
  type: 'doc',
  id: "changelog",
  customProps: {
    hash: '#22-april-2021',
    label: '22 April 2021',
  }
},
{
  type: 'doc',
  id: "changelog",
  customProps: {
    hash: '#22-april-2021',
    label: '31 May 2021',
  }
},
],
 };


import { workflow, node, trigger, sticky, newCredential, expr } from '@n8n/workflow-sdk';

const gmailCredential = newCredential('Gmail account', 'tSt6kBlHMrpMBGZm');

const checkInbox = trigger({
  type: 'n8n-nodes-base.gmailTrigger',
  version: 1.4,
  config: {
    name: 'Check Inbox',
    parameters: {
      pollTimes: { item: [{ mode: 'everyX', value: 15, unit: 'minutes' }] },
      simple: true,
      maxResults: 10,
      filters: {
        readStatus: 'both',
        includeSpamTrash: false,
        includeDrafts: false,
        q: 'in:inbox -label:"Welcome Sent" -from:me -category:promotions -category:social -category:updates -category:forums -unsubscribe -from:noreply -from:no-reply -from:donotreply -from:do-not-reply -from:notification -from:notifications -from:mailer -from:bounce -from:postmaster -from:alerts -from:newsletter -from:marketing -from:statements -from:billing -from:invoice -from:receipts -from:automated'
      }
    },
    credentials: { gmailOAuth2: gmailCredential },
    position: [240, 300]
  },
  output: [{ id: '1a06d968160ea5dc', threadId: '1a06d968160ea5dc', subject: 'Enquiry about a 3BHK', from: 'Anita Rao <anita.rao@example.com>', snippet: 'Hi, I would like to know more about your projects.' }]
});

const keepRealPeople = node({
  type: 'n8n-nodes-base.filter',
  version: 2.3,
  config: {
    name: 'Keep Only Real People',
    parameters: {
      looseTypeValidation: true,
      options: { ignoreCase: true, looseTypeValidation: true },
      conditions: {
        combinator: 'and',
        options: { caseSensitive: false, leftValue: '', typeValidation: 'loose', version: 2 },
        conditions: [
          { id: 'c01', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'noreply', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c02', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'no-reply', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c03', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'donotreply', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c04', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'notification', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c05', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'mailer', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c06', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'support@', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c07', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'github.com', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c08', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'google.com', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c09', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'linkedin.com', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c10', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'godaddy.com', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c11', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'facebook', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c12', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'naukri', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c13', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'nse.co.in', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c14', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'dhan.co', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c15', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'amazonses', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c16', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'mailchimp', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c17', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'sendgrid', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c18', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'circle.so', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c19', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'homeexchange', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c20', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'helpareporter', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c21', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: 'amazonbipin@gmail.com', operator: { type: 'string', operation: 'notContains' } },
          { id: 'c22', leftValue: expr('{{ JSON.stringify($json.from ?? $json.From ?? $json.headers?.from ?? "") }}'), rightValue: '@', operator: { type: 'string', operation: 'contains' } }
        ]
      }
    },
    position: [540, 300]
  },
  output: [{ id: '1a06d968160ea5dc', threadId: '1a06d968160ea5dc', subject: 'Enquiry about a 3BHK', from: 'Anita Rao <anita.rao@example.com>', snippet: 'Hi, I would like to know more about your projects.' }]
});

const sendWelcome = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Send Welcome Reply',
    parameters: {
      resource: 'message',
      operation: 'reply',
      messageId: expr('{{ $json.id }}'),
      emailType: 'text',
      message: 'Welcome to Sadhisha Homes\n\nThank you for reaching out to us. We have received your message and a member of our team will get back to you shortly.\n\nWarm regards,\nSadhisha Homes',
      options: {
        appendAttribution: false,
        replyToSenderOnly: true,
        senderName: 'Sadhisha Homes'
      }
    },
    credentials: { gmailOAuth2: gmailCredential },
    position: [840, 300]
  },
  output: [{ id: '1a06da19fc163c16', threadId: '1a06d968160ea5dc', labelIds: ['SENT'] }]
});

const markWelcomed = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Mark Thread As Welcomed',
    parameters: {
      resource: 'thread',
      operation: 'addLabels',
      threadId: expr('{{ $json.threadId }}'),
      labelIds: ['Label_17']
    },
    credentials: { gmailOAuth2: gmailCredential },
    position: [1140, 300]
  },
  output: [{ id: '1a06d968160ea5dc', messages: [{ id: '1a06d968160ea5dc', threadId: '1a06d968160ea5dc', labelIds: ['INBOX', 'Label_17'] }] }]
});

const guidance = sticky(
  '## Welcome responder\n\nPolls the inbox every 15 minutes and replies once to genuine new senders.\n\n**De-duplication:** the trigger query excludes `label:"Welcome Sent"`, and the last node applies that label after the reply is sent. Never remove one without the other, or senders will be welcomed repeatedly.\n\n**Filtering:** the trigger query drops promotions/social/updates and anything containing "unsubscribe"; the Filter node drops no-reply and bulk-sender domains. Widen the Filter rather than the query when a robot slips through.',
  [checkInbox, keepRealPeople, sendWelcome, markWelcomed],
  { color: 4 }
);

export default workflow('sadhisha-welcome-responder', 'Sadhisha Homes — Inbox Welcome Responder')
  .add(checkInbox)
  .to(keepRealPeople)
  .to(sendWelcome)
  .to(markWelcomed)
  .add(guidance);

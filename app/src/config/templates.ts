import type { MessageTemplate } from '../types';

export const templates: MessageTemplate[] = [
  {
    tone: 'diplomatic',
    label: 'Diplomatic',
    subject: "UK Policy on Ukraine - A Constituent's Perspective",
    body: `Dear {{rep_name}},

I am writing to you as a resident of {{constituency}} to share my views on the United Kingdom's continued role in supporting Ukraine.

I recognise that foreign policy decisions are complex and involve careful balancing of many priorities.

The UK has rightly positioned itself as one of Ukraine's most steadfast allies since the full-scale invasion began. This leadership has carried significant weight within NATO and across the broader international community. I would respectfully urge you to ensure that this commitment is sustained and, where possible, strengthened in the months ahead.

In particular, I believe the UK should continue to press for robust and effectively enforced sanctions against those who enable or profit from Russia's aggression. Sanctions enforcement remains an area where the UK can demonstrate genuine global leadership. The credibility of the international rules-based order depends in no small part on whether democracies follow through on their stated principles.

I would also welcome greater transparency from the Government regarding its long-term strategy for supporting Ukraine's sovereignty and eventual reconstruction. Constituents deserve to understand how their representatives intend to uphold the values we claim to stand for.

I do not raise this matter in a partisan spirit. Support for Ukraine's sovereignty is a cause that transcends party lines, and I hope it will continue to command broad consensus in Parliament.

Thank you for taking the time to consider my views.

Yours sincerely,

{{user_name}}`
  },
  {
    tone: 'firm',
    label: 'Firm',
    subject: 'Maintaining the UK\'s Commitment to Ukraine',
    body: `Dear {{rep_name}},

I am a constituent in {{constituency}}, and I am writing to express my firm expectation that the UK will continue to stand behind Ukraine.

Over the past two years, Britain has played a commendable role in providing military, economic, and diplomatic support. That record matters, and it must not be allowed to erode through fatigue or shifting political attention. Consistency is what distinguishes genuine commitment from gesture politics.

I would ask you, as my representative, to actively advocate for the following: sustained defence cooperation with Ukraine, including the provision of equipment and training; continued diplomatic pressure to isolate Russia economically; and meaningful planning for Ukraine's post-conflict reconstruction.

I understand that public finances are under pressure, but the cost of abandoning Ukraine would be far greater in the long run.

I am not naive about the difficulties involved. Supporting Ukraine requires resources, patience, and political courage. But I believe the British public broadly supports this course of action, and I would like to see that reflected clearly in parliamentary debate and government policy.

This is not a matter I raise lightly. I have given it considerable thought, and I believe history will judge this period harshly if democratic nations waver.

I appreciate your attention to this matter and would welcome any response you are able to offer.

Yours sincerely,

{{user_name}}`
  },
  {
    tone: 'urgent',
    label: 'Urgent',
    subject: 'Ukraine - The Need for Continued Action Now',
    body: `Dear {{rep_name}},

I am writing to you with some urgency as your constituent in {{constituency}}. The situation in Ukraine demands sustained attention, and I am concerned that momentum behind UK support may be slowing at precisely the wrong moment.

Every week that passes without clear resolve from Ukraine's allies is a week that emboldens those responsible for this conflict.

The UK was among the first nations to respond decisively to Russia's invasion, and that early leadership earned genuine respect internationally. But leadership is not a single act. It requires follow-through, and right now I want to be confident that my government and my MP are pressing for continued and accelerated support.

Specifically, I would urge you to push for timely delivery of pledged military assistance, strengthened enforcement of economic sanctions, and active diplomatic efforts to maintain the broadest possible coalition behind Ukraine. The window for decisive action does not stay open indefinitely.

I understand that Parliament faces many competing demands. But few issues carry the same weight for European security and for Britain's standing in the world. Ukraine's allies cannot afford to treat this as yesterday's crisis when it remains very much today's.

I would genuinely appreciate knowing where you stand on these matters and what steps you are taking.

Yours sincerely,

{{user_name}}`
  },
  {
    tone: 'humanitarian',
    label: 'Humanitarian',
    subject: 'Standing with Ukraine - A Matter of Shared Humanity',
    body: `Dear {{rep_name}},

As a resident of {{constituency}}, I am writing to you about something that weighs heavily on my conscience: the ongoing suffering of ordinary people in Ukraine and the UK's responsibility to respond.

The human cost of this conflict is staggering. Families torn apart, children growing up in bomb shelters, entire communities erased. I find it impossible to look at what is happening and not feel a deep sense of obligation to act. Britain has a proud tradition of standing up for human rights, and this must remain more than words on a page.

I would urge you to champion continued humanitarian aid to Ukraine, including support for displaced families both within Ukraine and those who have sought refuge here in the UK. I also believe the UK should play an active role in documenting and pursuing accountability for the atrocities committed against civilians.

The way we treat the most vulnerable people in a crisis reveals who we truly are as a nation.

Beyond the immediate emergency, I hope to see genuine commitment to Ukraine's long-term recovery - rebuilding schools, hospitals, and the civic infrastructure that communities need to heal. This is not charity. It is an investment in a more just and stable world.

Thank you for listening. I hope you will carry these concerns into your work in Parliament.

Yours sincerely,

{{user_name}}`
  },
  {
    tone: 'security',
    label: 'Security',
    subject: 'Ukraine and UK National Security - A Constituent\'s View',
    body: `Dear {{rep_name}},

I am writing as a constituent in {{constituency}} to raise what I consider a matter of direct relevance to British national security: the UK's ongoing support for Ukraine.

Russia's invasion is not simply a regional conflict. It represents a fundamental challenge to the security architecture that has underpinned European stability for decades. If the principle that borders cannot be redrawn by force is allowed to fail in Ukraine, the consequences will extend far beyond Eastern Europe.

The UK's strategic interests are clearly served by ensuring that Ukraine can defend its sovereignty. A weakened or abandoned Ukraine would leave NATO's eastern flank more exposed, embolden authoritarian regimes elsewhere, and undermine the credibility of Western security commitments.

I would encourage you to advocate for sustained defence cooperation, including long-term commitments to equipment, training, and intelligence sharing. Britain's defence industry and military expertise put us in a unique position to contribute meaningfully.

I would also urge support for efforts to reduce European energy dependence on Russian exports, which remains a strategic vulnerability that Moscow has shown itself willing to exploit.

This is not about escalation. It is about deterrence, resilience, and ensuring that the rules-based international order retains its meaning. I believe most people in this country understand that our security is bound up with Ukraine's.

I look forward to hearing your perspective.

Yours sincerely,

{{user_name}}`
  },
  {
    tone: 'concise',
    label: 'Concise',
    subject: 'Support for Ukraine - Please Act',
    body: `Dear {{rep_name}},

I live in {{constituency}}, and I am writing to ask you to do everything in your power to maintain and strengthen the UK's support for Ukraine.

This matters to me. I have followed this conflict closely and I believe Britain's response has been one of its better moments in recent years. I want to see that commitment continue.

Specifically, I would ask you to support continued military and economic assistance to Ukraine, push for full enforcement of existing sanctions, and back diplomatic efforts aimed at a just and lasting resolution to the conflict.

I am not asking for anything radical - simply that the UK follows through on what it has already promised.

I recognise you face many demands from constituents on many issues. But the outcome of this conflict will shape European security and Britain's place in the world for decades. It deserves sustained parliamentary attention.

I would welcome a response letting me know your current position and what actions you are taking on this issue.

Thank you for your time.

Yours sincerely,

{{user_name}}`
  }
];

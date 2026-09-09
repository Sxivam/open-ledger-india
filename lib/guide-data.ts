export type GuideFamily = 'vc' | 'pe' | 'finance';

export type GuideSource = {
  id: string;
  organization: string;
  title: string;
  url: string;
  supports: string;
  sourceType:
    | 'Official programme'
    | 'Official regulation'
    | 'Official hiring evidence';
};

export type Pathway = {
  id: string;
  family: GuideFamily;
  title: string;
  shortLabel: string;
  fit: string;
  reality: string;
  academicSignal: string;
  entryDoors: string[];
  hiringTest: string;
  usefulCredentials: string;
  proof: string;
  roadmap: { period: string; move: string }[];
  hardTruth: string;
  sources: string[];
};

export const guideSources: GuideSource[] = [
  {
    id: 'S01',
    organization: 'Bank of America',
    title: 'Global Investment Banking Summer Analyst 2027 — Mumbai',
    url: 'https://careers.bankofamerica.com/en-us/students/job-detail/14534/global-investment-banking-summer-analyst-2027-mumbai-mumbai-india',
    supports:
      'A current India front-office internship asks for outstanding academic achievement, modelling, valuation and research, but publishes no numeric grade cutoff.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S02',
    organization: 'EQT',
    title: 'Deal Team Analyst — Bengaluru',
    url: 'https://job-boards.eu.greenhouse.io/eqtpartners/jobs/4780888101',
    supports:
      'A current private-capital role asks for a postgraduate degree and at least one year of relevant deal experience; work spans origination, valuation, IC materials, execution and monitoring.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S03',
    organization: 'Kalaari Capital',
    title: 'Kalaari Fellowship',
    url: 'https://kalaari.com/fellowship',
    supports:
      'A paid two-year VC apprenticeship states that no specific academic or professional background is required and tests candidates through cases and interviews.',
    sourceType: 'Official programme',
  },
  {
    id: 'S04',
    organization: 'IIM Ahmedabad',
    title: 'PGP final placements 2025–26',
    url: 'https://www.iima.ac.in/inmediapgp-final-placements-2025-26',
    supports:
      'Top-campus recruiting remains a real access channel for investment banking, markets, asset management, private equity and venture capital firms.',
    sourceType: 'Official programme',
  },
  {
    id: 'S05',
    organization: 'IIM Bangalore',
    title: 'Summer placements 2026',
    url: 'https://www.iimb.ac.in/index.php/iimb-summer-placements-2026',
    supports:
      'The school reported 35 finance, banking and investment firms making 86 offers, including alternatives and front-office employers.',
    sourceType: 'Official programme',
  },
  {
    id: 'S06',
    organization: 'CFA Institute',
    title: 'CFA Program',
    url: 'https://www.cfainstitute.org/programs/cfa-program',
    supports:
      'The programme has three exams; earning the charter also requires 4,000 hours of relevant experience completed over at least 36 months.',
    sourceType: 'Official programme',
  },
  {
    id: 'S07',
    organization: 'GARP',
    title: 'Financial Risk Manager certification',
    url: 'https://www.garp.org/frm',
    supports:
      'FRM requires two exams and at least two years of relevant professional experience for certification.',
    sourceType: 'Official programme',
  },
  {
    id: 'S08',
    organization: 'NISM',
    title: 'Series XV Research Analyst examination',
    url: 'https://www.nism.ac.in/research-analyst-certification-examination/',
    supports:
      'The revised Series XV is the regulatory benchmark for covered research-analyst roles; it is a role-linked credential, not a VC or PE badge.',
    sourceType: 'Official programme',
  },
  {
    id: 'S09',
    organization: 'NISM',
    title: 'Investment Adviser examinations',
    url: 'https://www.nism.ac.in/investment-adviser/',
    supports:
      'Series X-A and X-B align with investment-advice and wealth roles governed by India’s adviser framework.',
    sourceType: 'Official programme',
  },
  {
    id: 'S10',
    organization: 'NISM',
    title: 'Securities Operations and Risk Management examination',
    url: 'https://www.nism.ac.in/securities-operations-and-risk-management/',
    supports:
      'Series VII is aimed at covered securities-operations and risk roles, rather than front-office investing.',
    sourceType: 'Official programme',
  },
  {
    id: 'S11',
    organization: 'ICAI',
    title: 'Industrial training announcement effective 1 January 2026',
    url: 'https://www.icai.org/post/23674',
    supports:
      'Eligible CA students can undertake 9–12 months of industrial training after the stated practical-training milestone; ICAI lists a minimum monthly stipend of ₹15,000.',
    sourceType: 'Official programme',
  },
  {
    id: 'S12',
    organization: 'NITI Aayog',
    title: 'Internship guidelines',
    url: 'https://www.niti.gov.in/sites/default/files/2023-01/NITI_Internship_Guidelines_17012023.pdf',
    supports:
      'A useful example of a true published academic cutoff: specified undergraduate applicants need 85% in Class XII, while specified graduate/postgraduate applicants need 70% at the preceding level.',
    sourceType: 'Official programme',
  },
  {
    id: 'S13',
    organization: 'SEBI',
    title: 'Research Analysts Regulations',
    url: 'https://www.sebi.gov.in/legal/regulations/feb-2025/securities-and-exchange-board-of-india-research-analysts-regulations-2014-last-amended-on-february-10-2025-_92320.html',
    supports:
      'Research analysis is a regulated activity in India; qualification, certification and registration questions depend on the role and employment arrangement.',
    sourceType: 'Official regulation',
  },
  {
    id: 'S14',
    organization: 'SEBI',
    title: 'Investment Advisers Regulations',
    url: 'https://www.sebi.gov.in/legal/regulations/feb-2025/securities-and-exchange-board-of-india-investment-advisers-regulations-2013-last-amended-on-february-10-2025-_92319.html',
    supports:
      'Personal investment advice sits within a distinct regulatory framework and should not be confused with general finance education or institutional investing.',
    sourceType: 'Official regulation',
  },
  {
    id: 'S15',
    organization: 'National Investment and Infrastructure Fund',
    title: 'Early-career programmes',
    url: 'https://niifindia.in/careers/',
    supports:
      'NIIF publishes distinct undergraduate research-analyst and postgraduate internship/analyst routes, and names analytical thinking, corporate-finance knowledge, investment mindset and communication as selection signals.',
    sourceType: 'Official programme',
  },
  {
    id: 'S16',
    organization: 'JPMorganChase',
    title: 'Private Credit Due Diligence and Analytics Analyst',
    url: 'https://in.linkedin.com/jobs/view/private-credit-due-diligence-and-analytics-analyst-at-jpmorganchase-4461295004',
    supports:
      'A company-attributable India listing accepts feeder experience across credit analysis, investment banking or asset management and asks for at least two years of relevant work.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S17',
    organization: 'Acumen',
    title: 'Analyst, Portfolio Analytics & Research — India',
    url: 'https://in.linkedin.com/jobs/view/analyst-portfolio-analytics-research-acumen-india-at-acumen-4359153623',
    supports:
      'A company-attributable impact role asks for relevant experience across investment analysis, portfolio analytics, consulting, economics, finance or research alongside mission alignment.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S18',
    organization: 'Goldman Sachs',
    title: 'India New Analyst Program',
    url: 'https://www.goldmansachs.com/careers/students/programs-and-internships/india/new-analyst-program',
    supports:
      'A large-bank graduate route publishes degree and graduation-year eligibility across investment banking, research, markets, risk and wealth, without a universal numeric percentage or certificate requirement.',
    sourceType: 'Official programme',
  },
  {
    id: 'S19',
    organization: 'IIM Ahmedabad',
    title: 'MBA admissions — Indian applicants',
    url: 'https://www.iima.ac.in/academics/mba/admissions/indians',
    supports:
      'The published admissions process explicitly uses prior school and bachelor’s performance alongside entrance-test, writing, interview and other factors—one reason academic consistency affects a major finance feeder route.',
    sourceType: 'Official programme',
  },
  {
    id: 'S20',
    organization: 'IIM Bangalore',
    title: 'PGP admission process',
    url: 'https://www.iimb.ac.in/admissions/pgp-admissions/admission-process',
    supports:
      'The published process assigns weight to Class X, Class XII and bachelor’s marks before and after interview, while also considering test, interview and work-experience signals.',
    sourceType: 'Official programme',
  },
];

export const gradeBands = [
  {
    lane: 'Investment banking · buyout PE',
    target: '8.0–8.5+/10 or 80–85%+',
    weight: 'High',
    reality:
      'Aim for the top 10–20% of your class, strong Class X/XII consistency and no active backlogs. Direct megafund PE remains an unusually narrow funnel even with these marks.',
    recovery:
      'Enter through boutique IB, Big Four deals/FDD, valuation, CA industrial training or strategy consulting; build 18–36 months of transaction evidence before a lateral move.',
    sources: ['S01', 'S02', 'S04', 'S05', 'S18'],
  },
  {
    lane: 'Venture capital · growth investing',
    target: '7.5–8.0+/10 or 75–80%+',
    weight: 'Medium to high',
    reality:
      'Growth investing resembles PE and screens harder. Seed VC can trade some pedigree for sector knowledge, startup operating credibility, original writing and a real founder network.',
    recovery:
      'Work in a founder’s office, accelerator, product/strategy team or sector startup; publish two defensible IC-style memos and a market map.',
    sources: ['S02', 'S03'],
  },
  {
    lane: 'Public markets · credit · deals',
    target: '7.5–8.0+/10 or 75–80%+',
    weight: 'Medium to high',
    reality:
      'Accounting depth, a stock or credit memo and evidence of disciplined analysis can compensate more than they can in a highly structured campus IB funnel.',
    recovery:
      'Start in ratings, audit, valuation, equity research support, corporate banking or NBFC underwriting; move after you can defend real analysis.',
    sources: ['S06', 'S08', 'S13'],
  },
  {
    lane: 'Markets · quant · model risk',
    target: '8.5+/10 in quantitative work',
    weight: 'High in relevant subjects',
    reality:
      'Averages matter less than hard evidence in probability, statistics, linear algebra, coding and numerical reasoning. Expect testing, not résumé-only selection.',
    recovery:
      'Use a risk, analytics or data seat as the first door; publish reproducible research with clean methodology instead of a trading screenshot.',
    sources: ['S07'],
  },
  {
    lane: 'FP&A · treasury · risk · wealth · operations',
    target: '7.0–7.5+/10 or 70–75%+',
    weight: 'Variable',
    reality:
      'The employer range is much broader. Role-aligned knowledge, Excel/SQL, accounting and communication often matter more than a prestige signal.',
    recovery:
      'Take a credible analyst, apprenticeship or finance-operations seat, then move toward the exact work you want through internal projects and lateral hiring.',
    sources: ['S07', 'S09', 'S10', 'S11'],
  },
];

export const credentials = [
  {
    name: 'CA',
    verdict: 'A full career path, not a quick add-on',
    bestFor:
      'Audit, diligence, valuation, credit, controllership, transaction services and finance leadership.',
    notEnough:
      'The qualification alone does not prove investment judgment, sourcing ability or deal leadership.',
    decision:
      'High-value if you genuinely want the accounting route. Choose articleship and industrial training for relevant work content, not just the brand name.',
    sources: ['S11'],
  },
  {
    name: 'CFA Program',
    verdict: 'Strong finance signal; never a job ticket',
    bestFor:
      'Public markets, equity research, asset management and credit; useful common language for valuation and private markets.',
    notEnough:
      'Level I does not replace an internship, transaction, stock pitch, credit memo or operating experience.',
    decision:
      'Worth studying when the curriculum matches the target job. The charter takes three exams plus qualifying work experience.',
    sources: ['S06'],
  },
  {
    name: 'Top recruiting MBA',
    verdict: 'Access channel first, coursework second',
    bestFor:
      'A reset into IB, markets, consulting, growth equity and selected PE/VC seats when the school actually hosts those recruiters.',
    notEnough:
      '“Any MBA” is not equivalent. Cost, placement access and pre-MBA experience determine the return.',
    decision:
      'Treat it as a recruiting-platform decision. Inspect firm-level placement evidence before taking on the time and cost.',
    sources: ['S04', 'S05'],
  },
  {
    name: 'FRM',
    verdict: 'Focused risk credential',
    bestFor:
      'Market, credit and liquidity risk, treasury, model risk and risk consulting.',
    notEnough: 'It is not the default credential for IB, VC or buyout PE.',
    decision:
      'Choose it when risk is the destination, not as a generic finance badge. Certification requires two exams and relevant experience.',
    sources: ['S07'],
  },
  {
    name: 'NISM role exams',
    verdict: 'Regulatory or role-linked, not prestige badges',
    bestFor:
      'Series XV for covered research roles; X-A/X-B for investment advice; Series VII for covered operations/risk work.',
    notEnough:
      'A NISM certificate by itself is not a meaningful VC, PE or investment-banking signal.',
    decision:
      'Take the exact series required by the job or regulation. Do not collect unrelated modules.',
    sources: ['S08', 'S09', 'S10', 'S13', 'S14'],
  },
  {
    name: 'Modelling · SQL · Python courses',
    verdict: 'Useful only when converted into proof',
    bestFor:
      'Building the actual skill used in deals, research, FP&A, risk or quant work.',
    notEnough:
      'A course-completion badge is weak evidence because employers can test the skill directly.',
    decision:
      'Take one strong course, then produce a clean model, memo, dashboard or research notebook you can defend line by line.',
    sources: ['S01', 'S02'],
  },
];

export const pathways: Pathway[] = [
  {
    id: 'seed-vc',
    family: 'vc',
    title: 'Seed / early-stage investing',
    shortLabel: 'Seed VC',
    fit: 'Curious generalists, sector specialists, founders and operators who can earn access to companies before a process becomes obvious.',
    reality:
      'The work is sourcing, founder calls, market maps, customer research, screen notes, thesis building and portfolio help—not watching pitch decks all day.',
    academicSignal:
      '7.5+/10 is a useful signal, but off-campus seed funds can overweight original judgment, writing, product sense and sector access.',
    entryDoors: [
      'VC fellowship or internship',
      'Founder’s office, product or startup strategy',
      'Accelerator, incubator or ecosystem role',
      'Technical or operating role in one sector',
    ],
    hiringTest:
      'A short company note, market-sizing or sector case, founder judgment, partner interviews and references.',
    usefulCredentials:
      'No universal certificate. CFA can help finance basics; product, technical or sector experience may be more relevant.',
    proof:
      'Two concise IC-style memos, a 40–60 company market map and 10–20 original founder/customer conversations with attributable insights.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Choose one India-specific vertical; learn the value chain and write a falsifiable thesis.',
      },
      {
        period: '3–12 months',
        move: 'Join a fellowship, accelerator, founder’s office or sector startup; build real sourcing and customer-research reps.',
      },
      {
        period: '12–30 months',
        move: 'Recruit for analyst/associate work using a measured record of sourced companies, screens and research used in decisions.',
      },
    ],
    hardTruth:
      '“I love startups” is not a profile. A candidate who knows one market and can bring proprietary calls or companies usually wins.',
    sources: ['S03'],
  },
  {
    id: 'sector-vc',
    family: 'vc',
    title: 'Sector / specialist venture',
    shortLabel: 'Sector VC',
    fit: 'Engineers, clinicians, scientists, policy researchers and operators with real domain fluency.',
    reality:
      'Specialist funds need someone who can challenge product claims, map regulation and speak credibly with technical founders and customers.',
    academicSignal:
      'Strong relevant coursework helps, but domain work—research, shipped product, patents, field experience or operating results—can carry more weight.',
    entryDoors: [
      'Deep-tech, climate, health or fintech operator',
      'Sector research or consulting',
      'Incubator or innovation programme',
      'Generalist VC with a specialist thesis',
    ],
    hiringTest:
      'Technical market map, customer discovery, regulation and adoption analysis, plus the ability to explain the domain without jargon.',
    usefulCredentials:
      'Sector qualifications can matter more than finance certificates. Learn cap tables, venture returns and basic accounting alongside the domain.',
    proof:
      'A technical-commercial diligence memo that separates what works in the lab from what customers will pay for in India.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Translate domain expertise into an investable landscape: buyers, budgets, regulation, unit economics and failure modes.',
      },
      {
        period: '3–12 months',
        move: 'Build operator or research credibility and make useful introductions across the ecosystem.',
      },
      {
        period: '12–30 months',
        move: 'Pitch specialist funds with a thesis and a network, not a generic request to “break into VC.”',
      },
    ],
    hardTruth:
      'Being technical is not enough. You still need commercial judgment, concise writing and comfort saying why a good technology may be a bad investment.',
    sources: ['S03'],
  },
  {
    id: 'vc-platform',
    family: 'vc',
    title: 'Platform / portfolio operations',
    shortLabel: 'VC platform',
    fit: 'Recruiting, growth, community, finance, communications and operating specialists who want to support portfolio companies.',
    reality:
      'This is a legitimate VC career: talent, go-to-market, portfolio finance, founder programmes and community. It is different from underwriting investments.',
    academicSignal:
      'Grades usually carry less weight than functional achievement and evidence that founders trust your help.',
    entryDoors: [
      'Startup talent or people operations',
      'Growth, partnerships or community',
      'Portfolio finance or business operations',
      'Accelerator programme management',
    ],
    hiringTest:
      'A functional case—hiring plan, GTM diagnosis, founder programme or portfolio reporting design—plus stakeholder judgment.',
    usefulCredentials:
      'Choose role-specific training. Finance credentials help portfolio-finance work, but not talent or community by default.',
    proof:
      'One operator-grade playbook with outcomes: hiring funnel, sales process, reporting pack or founder programme you actually ran.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Choose the platform function where you already have evidence and learn the portfolio’s recurring problems.',
      },
      {
        period: '3–12 months',
        move: 'Build the function inside a startup, accelerator or services firm and quantify the result.',
      },
      {
        period: '12–30 months',
        move: 'Join a fund platform team or continue toward operating leadership across portfolio companies.',
      },
    ],
    hardTruth:
      'A platform seat does not automatically convert into an investing seat. Take it because you want the function; earn investing reps separately if that is the later goal.',
    sources: ['S03'],
  },
  {
    id: 'growth-equity',
    family: 'pe',
    title: 'Growth equity',
    shortLabel: 'Growth equity',
    fit: 'Candidates who combine transaction discipline with comfort around fast-growing, imperfect businesses.',
    reality:
      'The work is commercial diligence, unit economics, operating models, valuation, cap tables, IC writing and portfolio monitoring.',
    academicSignal:
      '8.0+/10 and a strong feeder employer are common competitive signals. Direct entry is possible but much less common than a post-IB, consulting or deals lateral.',
    entryDoors: [
      'Investment banking or M&A',
      'Big Four deals, FDD or valuation',
      'Strategy consulting',
      'Strategic finance or corporate development',
    ],
    hiringTest:
      'Timed operating model, company case, valuation, accounting questions, IC presentation and references.',
    usefulCredentials:
      'CA, CFA or a top recruiting MBA can help. Two years of live diligence and execution usually beat a certificate-only profile.',
    proof:
      'A driver-based model, public/private comps, cap-table and dilution work, a downside case and a 6–10 page investment memo.',
    roadmap: [
      {
        period: '0–6 months',
        move: 'Master accounting, unit economics, valuation, cap tables and integrated modelling.',
      },
      {
        period: '6–24 months',
        move: 'Get live transaction, diligence or strategic-finance reps and keep a precise deal/work log.',
      },
      {
        period: '18–36 months',
        move: 'Lateral when you can own a model, frame management questions and defend a full memo.',
      },
    ],
    hardTruth:
      'CFA Level I without execution reps rarely substitutes for two years of relevant work.',
    sources: ['S02', 'S04', 'S05', 'S06'],
  },
  {
    id: 'buyout-pe',
    family: 'pe',
    title: 'Buyout private equity',
    shortLabel: 'Buyout PE',
    fit: 'Deal professionals who enjoy accounting, leverage, diligence, negotiation and concentrated ownership work.',
    reality:
      'You underwrite acquisitions, debt capacity and downside; coordinate diligence; assess management; and plan value creation and exit.',
    academicSignal:
      'This is the most pedigree-sensitive lane at entry. Top-decile academics help, but the decisive signal is usually a top campus or 2–3 years in a feeder role.',
    entryDoors: [
      'M&A / investment banking',
      'Strategy consulting',
      'CA plus FDD or transaction advisory',
      'Selected top-MBA campus processes',
    ],
    hiringTest:
      'Timed LBO model, investment case, accounting drill, downside/debt discussion, IC defence and reference checks.',
    usefulCredentials:
      'CA is powerful for accounting and diligence; a top MBA can open recruiting; CFA is additive. None replaces transactions.',
    proof:
      'Full sources-and-uses LBO, debt schedule and cash sweep, MOIC/IRR sensitivities, diligence list and 100-day value-creation plan.',
    roadmap: [
      {
        period: '0–12 months',
        move: 'Choose a feeder route and learn accounting cold; become fast at a clean LBO without shortcuts.',
      },
      {
        period: '12–36 months',
        move: 'Seek closed deals, management exposure, diligence ownership and high-quality modelling in IB, consulting or deals.',
      },
      {
        period: '24–48 months',
        move: 'Recruit for associate roles only when you can defend industry, downside, debt and exit assumptions under pressure.',
      },
    ],
    hardTruth:
      'For a non-target graduate with no feeder experience, direct megafund entry is not a realistic primary plan. Use a two-step route.',
    sources: ['S02', 'S04', 'S05'],
  },
  {
    id: 'private-credit',
    family: 'pe',
    title: 'Private credit / direct lending',
    shortLabel: 'Private credit',
    fit: 'Accounting-heavy thinkers who care more about repayment, structure and downside than headline growth.',
    reality:
      'The job is cash-flow underwriting, leverage and coverage, covenant design, legal-document review, recovery analysis and portfolio monitoring.',
    academicSignal:
      '7.5+/10 is useful. Technical credit work from ratings, banking, NBFCs and audit can substitute for a top-campus route more often than in buyout PE.',
    entryDoors: [
      'Credit ratings or credit research',
      'Corporate/commercial banking',
      'NBFC or project-finance underwriting',
      'Audit, FDD or leveraged finance',
    ],
    hiringTest:
      'Credit memo, cash-flow downside model, covenant and recovery questions, accounting test and documentation judgment.',
    usefulCredentials:
      'CA and CFA are credible signals. FRM helps selected risk-heavy routes; none replaces underwriting reps.',
    proof:
      'A 5–8 page credit memo, liquidity downside, leverage/coverage bridge, covenant package and security/recovery waterfall.',
    roadmap: [
      {
        period: '0–6 months',
        move: 'Learn cash conversion, leverage, coverage, security, priority, covenants and insolvency/recovery logic.',
      },
      {
        period: '6–24 months',
        move: 'Underwrite in ratings, banking, project finance, an NBFC, audit/FDD or credit research.',
      },
      {
        period: '18–36 months',
        move: 'Lateral into alternatives after you can own a credit view and monitor it after close.',
      },
    ],
    hardTruth:
      'This can be the most accessible private-markets lane from a non-elite college—but only if you become genuinely strong at accounting and downside analysis.',
    sources: ['S06', 'S07', 'S16'],
  },
  {
    id: 'impact-investing',
    family: 'pe',
    title: 'Impact / climate investing',
    shortLabel: 'Impact',
    fit: 'Candidates with commercial finance skills and credible depth in climate, health, agriculture, inclusion or livelihoods.',
    reality:
      'The work combines conventional underwriting with theory of change, impact diligence, metric design, stakeholder questions and reporting.',
    academicSignal:
      '7.5+/10 is a reasonable target. Sector credibility and rigorous commercial thinking matter more than a generic claim of mission alignment.',
    entryDoors: [
      'Mission-led company or climate operator',
      'Development consulting or economics research',
      'Project finance or mainstream investing',
      'Impact measurement and portfolio analytics',
    ],
    hiringTest:
      'Commercial case plus impact framework, data reasoning, sector judgment and a credible explanation of why this mission matters to you.',
    usefulCredentials:
      'CFA/CA can supply finance depth; sector qualifications and recognised impact frameworks help when converted into a real case.',
    proof:
      'Commercial memo plus theory of change, impact-risk/additionality analysis, metric set and measurement plan.',
    roadmap: [
      {
        period: '0–6 months',
        move: 'Choose one problem area and learn both its economics and on-the-ground beneficiary/customer reality.',
      },
      {
        period: '6–24 months',
        move: 'Build sector, finance or measurement reps in an operator, research, consulting or investment role.',
      },
      {
        period: '18–36 months',
        move: 'Apply with a sample that can survive both commercial and impact scrutiny.',
      },
    ],
    hardTruth:
      'Mission enthusiasm without finance is insufficient; pure finance without real sector or impact understanding is also weak.',
    sources: ['S17'],
  },
  {
    id: 'ib-ma',
    family: 'finance',
    title: 'Investment banking / M&A',
    shortLabel: 'IB / M&A',
    fit: 'High-stamina analysts who like transactions, modelling, client materials and deadline-driven team work.',
    reality:
      'Analysts build valuations and models, research companies, draft presentations and support diligence and execution. The hours can be severe and the work is detail-heavy.',
    academicSignal:
      '8.0–8.5+/10 is the safest competitive target for large-bank campus funnels. Current official roles often say “outstanding academics” without publishing a number.',
    entryDoors: [
      'Large-bank internship or analyst programme',
      'Boutique investment bank',
      'Valuation, FDD or transaction advisory',
      'CA industrial training or corporate development',
    ],
    hiringTest:
      'Accounting, enterprise-to-equity bridge, valuation, merger consequences, modelling test, company discussion and behavioural stamina checks.',
    usefulCredentials:
      'CA or a top recruiting MBA can open routes; CFA helps fundamentals. Modelling courses matter only if you can pass a timed test.',
    proof:
      'A clean three-statement model, DCF and comps, one transaction rationale and a short pitch you can explain without reading slides.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Master statements, valuation and presentation basics; rebuild one public-company model yourself.',
      },
      {
        period: '3–18 months',
        move: 'Win the closest execution-heavy seat—boutique, Big Four, CA training, corp dev or bank internship.',
      },
      {
        period: '12–30 months',
        move: 'Lateral using named responsibilities, closed transactions and strong references—not vague “deal exposure.”',
      },
    ],
    hardTruth:
      'A famous certificate does not compensate for weak accounting, formatting errors or an inability to explain your own assumptions.',
    sources: ['S01', 'S04', 'S05', 'S11', 'S18'],
  },
  {
    id: 'deals-valuation',
    family: 'finance',
    title: 'Deals / valuation / transaction advisory',
    shortLabel: 'Deals & valuation',
    fit: 'Candidates who want transaction skills through a wider entry funnel than large-bank IB.',
    reality:
      'Work can include business valuation, financial due diligence, purchase-price analysis, data books, quality of earnings and transaction support.',
    academicSignal:
      '7.5+/10 is a useful target; accounting strength and internships can compensate. Team and mandate quality vary materially.',
    entryDoors: [
      'Big Four or specialist advisory',
      'Valuation boutique',
      'Audit to FDD internal move',
      'CA articleship or industrial training',
    ],
    hiringTest:
      'Statements, working-capital and QoE reasoning, valuation, Excel case and careful explanation of adjustments.',
    usefulCredentials:
      'CA is especially relevant; CFA adds valuation language. A modelling badge matters little without clean work.',
    proof:
      'One valuation report and a simplified diligence/QoE case with a bridge from reported EBITDA to sustainable earnings.',
    roadmap: [
      {
        period: '0–6 months',
        move: 'Build accounting and Excel depth; learn what each deals subteam actually owns.',
      },
      {
        period: '6–24 months',
        move: 'Seek client-facing analysis, manager access and end-to-end work rather than repetitive data processing only.',
      },
      {
        period: '18–36 months',
        move: 'Move toward IB, corp dev, credit or investing with transaction-specific evidence.',
      },
    ],
    hardTruth:
      'The employer logo does not guarantee good deal exposure. Ask what the team models, writes, presents and owns before accepting.',
    sources: ['S01', 'S02', 'S11'],
  },
  {
    id: 'public-markets',
    family: 'finance',
    title: 'Equity research / asset management',
    shortLabel: 'Public markets',
    fit: 'Independent thinkers who enjoy accounting, industries, primary research and being proven wrong by new evidence.',
    reality:
      'You build forecasts and valuations, track companies, speak with industry participants, write research and update views when facts change.',
    academicSignal:
      '7.5+/10 helps. A genuinely good stock pitch and accounting fluency can be more differentiating than another generic internship.',
    entryDoors: [
      'Brokerage or independent research',
      'AMC, PMS or family office internship',
      'Ratings, data or research support',
      'Sector role followed by an investing lateral',
    ],
    hiringTest:
      'Stock pitch, accounting red flags, forecast drivers, valuation, variant perception and questions about how your view could be wrong.',
    usefulCredentials:
      'CFA is highly aligned. NISM Series XV may be required for covered research roles; confirm the exact regulatory position.',
    proof:
      'Two dated stock memos with a model, thesis, valuation, risks, disconfirming evidence and a post-mortem—not target-price theatre.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Choose one sector, read filings and build a model from raw statements.',
      },
      {
        period: '3–12 months',
        move: 'Publish a small, dated research archive and seek an apprenticeship with real analyst feedback.',
      },
      {
        period: '12–30 months',
        move: 'Use a defensible research record to move into an AMC, PMS, family office or stronger sell-side team.',
      },
    ],
    hardTruth:
      'Passing CFA Level I does not show that you can form, update or abandon an investment view.',
    sources: ['S06', 'S08', 'S13'],
  },
  {
    id: 'corp-finance',
    family: 'finance',
    title: 'Corporate finance / FP&A / treasury',
    shortLabel: 'Corporate finance',
    fit: 'Operators who want to turn business activity into forecasts, capital decisions, controls and management choices.',
    reality:
      'FP&A owns budgets, forecasts and business partnering; treasury manages liquidity, banking, FX and funding; corporate development adds strategic transactions.',
    academicSignal:
      '7.0–7.5+/10 is often workable. Employers care about accounting, Excel, communication and whether you can explain business drivers.',
    entryDoors: [
      'Finance graduate or management-trainee programme',
      'Startup finance or business finance',
      'Audit or controllership',
      'Banking operations or treasury support',
    ],
    hiringTest:
      'Budget/forecast case, variance bridge, cash-flow reasoning, Excel, stakeholder scenario and concise management communication.',
    usefulCredentials:
      'CA/CMA are strong for leadership tracks; CFA is optional. SQL or BI skills can matter more for modern business-finance roles.',
    proof:
      'A driver-based forecast, cash runway model, monthly variance pack and one recommendation tied to operating decisions.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Learn statements, planning, variance analysis and how the target industry makes money.',
      },
      {
        period: '3–18 months',
        move: 'Own a forecast, close process, treasury workflow or business unit—not only reporting production.',
      },
      {
        period: '12–36 months',
        move: 'Move toward business partnering, treasury, corp dev or finance leadership based on owned decisions.',
      },
    ],
    hardTruth:
      'Generic MIS work can stall. Seek ownership of a driver, decision, forecast or cash outcome that senior operators use.',
    sources: ['S11'],
  },
  {
    id: 'risk-credit',
    family: 'finance',
    title: 'Risk / credit / ratings',
    shortLabel: 'Risk & credit',
    fit: 'Structured thinkers who like downside, policy, portfolios and decisions under uncertainty.',
    reality:
      'Roles span borrower analysis, ratings, market and liquidity risk, model validation, limits, stress testing and risk reporting.',
    academicSignal:
      '7.0–8.0+/10 depending on technical intensity. Relevant accounting, statistics and coding performance matters more than one blended average.',
    entryDoors: [
      'Credit-rating agency',
      'Bank or NBFC credit underwriting',
      'Risk consulting or model validation',
      'Securities operations with a risk path',
    ],
    hiringTest:
      'Financial-ratio and cash-flow case for credit; probability/statistics and coding for model risk; policy judgment for operational risk.',
    usefulCredentials:
      'FRM is well aligned; CA/CFA help credit. NISM Series VII is role-linked for covered securities operations, not a universal risk credential.',
    proof:
      'A credit note or reproducible stress-test/model-validation notebook with clear assumptions, limitations and decision thresholds.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Pick one risk family. Credit, market, model and operational risk have different skill stacks.',
      },
      {
        period: '3–18 months',
        move: 'Get a seat that makes or challenges real limits, ratings, models or underwriting decisions.',
      },
      {
        period: '12–30 months',
        move: 'Specialise toward portfolio risk, treasury, private credit, model risk or leadership based on owned decisions.',
      },
    ],
    hardTruth:
      'Risk is not a fallback version of front-office finance. The best careers come from choosing the specific risk craft deliberately.',
    sources: ['S07', 'S10'],
  },
  {
    id: 'markets-quant',
    family: 'finance',
    title: 'Markets / quant / trading analytics',
    shortLabel: 'Markets & quant',
    fit: 'Fast numerical thinkers who enjoy probability, coding, microstructure and decisions with immediate feedback.',
    reality:
      'Work ranges from sales and trading support to pricing, systematic research, execution, derivatives, desk strategy and quantitative risk.',
    academicSignal:
      'Strong marks in mathematics, statistics, computer science or engineering matter. For quant seats, evidence of depth is more important than a generic finance credential.',
    entryDoors: [
      'Bank markets or risk internship',
      'Quant research or analytics',
      'Model validation or market risk',
      'Data engineering around trading systems',
    ],
    hiringTest:
      'Mental maths, probability, statistics, coding, market intuition and the ability to reason aloud under time pressure.',
    usefulCredentials:
      'FRM can help risk; CFA can help markets context. Neither replaces mathematics, coding or a tested research process.',
    proof:
      'A reproducible strategy or pricing notebook with clean data, transaction costs, out-of-sample testing and documented failure modes.',
    roadmap: [
      {
        period: '0–6 months',
        move: 'Build probability, statistics, linear algebra, Python and market-microstructure fundamentals.',
      },
      {
        period: '6–18 months',
        move: 'Enter via markets, analytics, model risk or trading technology and learn from production constraints.',
      },
      {
        period: '12–30 months',
        move: 'Move toward the desk or strategy whose test you can now pass with real research evidence.',
      },
    ],
    hardTruth:
      'A backtest chart is not proof. Most amateur strategies disappear after leakage, costs and regime changes are handled correctly.',
    sources: ['S07'],
  },
  {
    id: 'wealth-advice',
    family: 'finance',
    title: 'Wealth / investment advisory',
    shortLabel: 'Wealth & advice',
    fit: 'Client-oriented professionals who can translate risk, products, tax context and behaviour into suitable decisions.',
    reality:
      'The work blends relationship management, portfolio construction, product due diligence, suitability, compliance and long-term client trust.',
    academicSignal:
      '7.0–7.5+/10 is often workable. Communication, integrity, product knowledge and a credible client-service record can dominate.',
    entryDoors: [
      'Bank or wealth-management analyst',
      'Mutual-fund or distribution role',
      'Client-service and portfolio support',
      'Research or financial-planning path',
    ],
    hiringTest:
      'Client scenario, product/risk comparison, suitability reasoning, communication and knowledge of the applicable compliance boundaries.',
    usefulCredentials:
      'NISM modules may be mandatory for specific activities. CFA can help investment depth; advice and distribution have distinct regulatory obligations.',
    proof:
      'An investment-policy statement, risk-profile rationale and model portfolio with costs, tax assumptions, rebalancing rules and plain-language explanation.',
    roadmap: [
      {
        period: '0–3 months',
        move: 'Choose advice, relationship management, research or operations and identify the exact regulatory requirement.',
      },
      {
        period: '3–18 months',
        move: 'Build product and client reps under an appropriately registered or regulated employer.',
      },
      {
        period: '12–36 months',
        move: 'Progress toward advisory, portfolio or relationship ownership without crossing compliance boundaries.',
      },
    ],
    hardTruth:
      'Good sales is not automatically good advice. Reputation compounds only if suitability, disclosure and client outcomes are treated as core work.',
    sources: ['S09', 'S14'],
  },
];

export const profileRoutes = [
  {
    profile: 'Top campus · strong academics',
    directMove:
      'Use structured internships and placement processes for IB, markets, consulting, VC and selected PE seats.',
    proofGap:
      'You still need technical preparation, internships and a credible reason for the exact lane.',
  },
  {
    profile: 'CA / commerce route',
    directMove:
      'Aim articleship or industrial training toward audit, valuation, FDD, treasury, credit or corporate finance.',
    proofGap:
      'Translate accounting into transactions, underwriting or business decisions; avoid presenting every audit task as deal work.',
  },
  {
    profile: 'Engineer / maths / science',
    directMove:
      'Target quant, model risk, fintech, analytics or specialist VC; add accounting and markets literacy where needed.',
    proofGap:
      'Show production-grade code, research discipline or domain insight—not only coursework and competitive-programming ranks.',
  },
  {
    profile: 'Non-target college · ordinary grades',
    directMove:
      'Prioritise boutique IB, ratings, NBFC credit, valuation, research support, startup finance or founder’s-office work.',
    proofGap:
      'Build a two-step plan and public proof. Do not make direct megafund PE the only definition of success.',
  },
  {
    profile: 'Startup operator / founder',
    directMove:
      'Use sector knowledge, network and operating decisions to enter seed VC, growth, corp dev or portfolio operations.',
    proofGap:
      'Translate anecdotes into rigorous market, unit-economic and investment reasoning.',
  },
];

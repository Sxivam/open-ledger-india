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
    organization: 'Morgan Stanley',
    title:
      '2027 Investment Banking / Global Capital Markets GC Summer Analyst — Mumbai',
    url: 'https://morganstanley.tal.net/vx/lang-en-GB/mobile-0/brand-2/candidate/so/pm/1/pl/1/opp/21362-2027-Investment-Banking-Global-Capital-Markets-GC-Summer-Analyst-Program-Mumbai/en-GB',
    supports:
      'Hiring example checked 10 November 2026, not an availability promise: this Mumbai Global Centres internship requires current postgraduate study or equivalent, analytical ability and communication. No numeric grade cutoff is published. The work includes valuation, research, presentations and deal-execution support; it should not be presented as identical to a client-coverage investment-banking seat.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S02',
    organization: 'Goldman Sachs',
    title: 'Private Credit Investing — Associate, Mumbai',
    url: 'https://higher.gs.com/roles/160621',
    supports:
      'Hiring example checked 10 November 2026: the Mumbai associate role requests 3–6 years in investment banking, PE, leveraged finance or private credit, a relevant degree and a strong academic record, without a numeric grade cutoff. Its work includes diligence, structuring, investment-committee analysis and monitoring. This illustrates an experienced route, not a universal prerequisite or a fresher vacancy.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S03',
    organization: 'Kalaari Capital',
    title: 'Kalaari Fellowship',
    url: 'https://kalaari.com/fellowship',
    supports:
      'Programme example checked 10 November 2026: a paid, two-year, full-time Bengaluru fellowship with cases and interviews, no prescribed academic/professional background, and startup exposure valued. Its published application window closed 4 October 2026 for the March 2027 cohort. It does not accept short-duration summer interns. Use it to understand a route, not as a live application.',
    sourceType: 'Official programme',
  },
  {
    id: 'S04',
    organization: 'IIM Ahmedabad',
    title: 'PGP final placements 2025–26',
    url: 'https://www.iima.ac.in/inmediapgp-final-placements-2025-26',
    supports:
      'The official March 2026 placement report names IB/markets and PE/VC/asset-management recruiters. It supports campus recruitment as one access route, not a universal college requirement, an individual hiring probability or a published CGPA cutoff.',
    sourceType: 'Official programme',
  },
  {
    id: 'S05',
    organization: 'IIM Bangalore',
    title: 'Summer placements 2026',
    url: 'https://www.iimb.ac.in/index.php/iimb-summer-placements-2026',
    supports:
      'Historical campus-recruiting evidence: the school reported finance, banking and investment offers. Employer participation does not establish the grades required of every candidate or guarantee access to any particular finance role. This reference is not a currently open recruitment notice.',
    sourceType: 'Official programme',
  },
  {
    id: 'S06',
    organization: 'CFA Institute',
    title: 'CFA charter requirements',
    url: 'https://www.cfainstitute.org/programs/cfa-program/charter',
    supports:
      'CFA Institute requires all three exam levels, the Practical Skills Modules, qualifying work experience of 4,000 hours over at least 36 months, and approved membership with professional references to use the charter. Passing Level I or all exams alone is not the charter. Checked 10 November 2026.',
    sourceType: 'Official programme',
  },
  {
    id: 'S07',
    organization: 'GARP',
    title: 'FRM certification and exam eligibility',
    url: 'https://www.garp.org/frm/frequently-asked-questions',
    supports:
      'GARP has no educational or professional prerequisite to register for FRM exams. Certification requires both exam parts and two years of relevant full-time risk-management experience. Passing an exam and holding certification are distinct. Checked 10 November 2026.',
    sourceType: 'Official programme',
  },
  {
    id: 'S08',
    organization: 'NISM',
    title: 'Series XV Research Analyst examination',
    url: 'https://www.nism.ac.in/research-analyst-certification-examination/',
    supports:
      'NISM’s revised Series XV began on 20 January 2026 and is the certification benchmark for covered research-analysis activity. Different rules can apply to research-services sales/support staff; a certificate alone does not establish permission to operate an independent research business.',
    sourceType: 'Official programme',
  },
  {
    id: 'S09',
    organization: 'NISM',
    title: 'Investment Adviser examinations',
    url: 'https://www.nism.ac.in/investment-adviser/',
    supports:
      'NISM X-A and X-B relate to covered investment-advice activity. SEBI’s June 2026 circular distinguishes staff doing only sales/non-core services, for whom XXV-B applies subject to transition provisions. Match the exam to actual duties and confirm the employer’s compliance requirements.',
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
      'ICAI’s 12 January 2026 announcement states Intermediate passed and at least 12 months of practical training for industrial training; duration 9–12 months, three months’ advance notice to the principal, and at least ₹15,000 monthly stipend. Employer eligibility and registration arrangements also matter. Checked 10 November 2026.',
    sourceType: 'Official programme',
  },
  {
    id: 'S12',
    organization: 'NITI Aayog',
    title: 'Internship guidelines',
    url: 'https://www.niti.gov.in/sites/default/files/2023-01/NITI_Internship_Guidelines_17012023.pdf',
    supports:
      'Published scheme-specific thresholds: undergraduates who have completed/appeared in second-year/fourth-semester exams need at least 85% in Class XII; specified postgraduate/research and recent-graduate categories require at least 70% at the relevant prior level, with additional stage/timing conditions. These are not private-sector finance cutoffs. Checked 10 November 2026.',
    sourceType: 'Official programme',
  },
  {
    id: 'S13',
    organization: 'SEBI',
    title: '2026 Master Circular for Research Analysts',
    url: 'https://www.sebi.gov.in/legal/master-circulars/feb-2026/master-circular-for-research-analysts_99571.html',
    supports:
      'A primary reference for the research-analyst framework, read together with subsequent amendments and circulars. Qualifications, certification and registration are separate questions; requirements depend on the activity and employment arrangement. A course or exam pass is not a general licence to sell research.',
    sourceType: 'Official regulation',
  },
  {
    id: 'S14',
    organization: 'SEBI',
    title: '2026 Master Circular for Investment Advisers',
    url: 'https://www.sebi.gov.in/legal/master-circulars/feb-2026/master-circular-for-investment-advisers_99569.html',
    supports:
      'A primary reference for investment advice, read with later changes including the June 2026 sales/non-core certification circular. Advice, distribution and client-service roles have distinct obligations; passing NISM exams alone does not establish independent adviser registration.',
    sourceType: 'Official regulation',
  },
  {
    id: 'S15',
    organization: 'National Investment and Infrastructure Fund',
    title: 'Early-career programmes',
    url: 'https://niifindia.in/careers/',
    supports:
      'Programme-design reference: NIIF describes separate undergraduate research-analyst and postgraduate internship/analyst routes with analytical, corporate-finance and communication requirements. This is background evidence rather than a confirmed current opening; the page was not fully accessible in the 10 November check.',
    sourceType: 'Official programme',
  },
  {
    id: 'S16',
    organization: 'Ares Management',
    title: 'Analyst, Portfolio Management — US Direct Lending',
    url: 'https://in.linkedin.com/jobs/view/analyst-portfolio-management-us-direct-lending-at-ares-management-4472684755',
    supports:
      'Employer-attributed hiring example recorded in the ledger: Mumbai portfolio-management work asks for an MBA/equivalent and 0–3 years across funds, banking, advisory, credit analysis or valuation. It illustrates monitoring and valuation work supporting US direct lending, not the same mandate as an origination/investing seat. Vacancy availability belongs in the opportunities ledger.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S17',
    organization: 'Acumen',
    title: 'Analyst, Portfolio Analytics & Research — India',
    url: 'https://in.linkedin.com/jobs/view/analyst-portfolio-analytics-research-acumen-india-at-acumen-4359153623',
    supports:
      'Historical employer-attributed example of impact portfolio analytics and research, with relevant analysis/consulting/research experience and mission alignment. It illustrates a distinct function and does not establish an open vacancy, a universal grade rule or a guaranteed move into investing.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S18',
    organization: 'Goldman Sachs',
    title: 'India New Analyst Program — 2027 cycle eligibility benchmark',
    url: 'https://www.goldmansachs.com/careers/students/programs-and-internships/india/new-analyst-program',
    supports:
      'Historical degree/graduation-year eligibility benchmark, not an open application: the 2027 cycle closed on 4 October 2026. Broad programme eligibility does not establish a numerical market-wide grade requirement or a compulsory certificate for every finance team.',
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
  {
    id: 'S21',
    organization: 'Rockstud Capital',
    title: 'Investment Associate — Venture Capital',
    url: 'https://in.linkedin.com/jobs/view/investment-associate-%E2%80%93-venture-capital-at-rockstud-capital-4481047255',
    supports:
      'Employer-attributed VC hiring example recorded in the ledger: relevant investing, banking, advisory, consulting or sector experience and a relevant degree are requested; CA/CFA progress/MBA are advantageous. It supports sourcing, modelling and writing as useful evidence, without a universal numerical grade or experience rule.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S22',
    organization: 'NISM',
    title: 'Mutual Fund Distributors certification',
    url: 'https://www.nism.ac.in/mutual-fund-distributors/',
    supports:
      'Series V-A is the role-linked certification for covered mutual-fund distribution. Distribution differs from investment advice; other registration/employer requirements still apply. It is not a general requirement for every finance career.',
    sourceType: 'Official programme',
  },
  {
    id: 'S23',
    organization: 'SEBI',
    title:
      'Investment-advice sales and non-core staff certification — June 2026',
    url: 'https://www.sebi.gov.in/sebi_data/attachdocs/jun-2026/1782299902147.pdf',
    supports:
      'The 24 June 2026 circular specifies XXV-B for advice-associated staff performing only sales/non-core services, while other covered advice staff retain X-A/X-B. Existing certificates have transition provisions. Check duties before selecting an exam.',
    sourceType: 'Official regulation',
  },
  {
    id: 'S24',
    organization: 'NISM',
    title: 'Research-services sales and non-core staff — March 2026 circular',
    url: 'https://www.nism.ac.in/circular/sebi-circular-for-nism-series-xxv-a-persons-associated-with-research-services-sales-and-other-non-core-services-certification-examination-dated-march-11-2026/',
    supports:
      'NISM publishes the March 2026 SEBI circular on XXV-A for research-services sales and other non-core staff. Do not apply the research-analyst exam requirement indiscriminately to all support jobs.',
    sourceType: 'Official regulation',
  },
  {
    id: 'S25',
    organization: 'NISM',
    title: 'Category I and II AIF Managers certification',
    url: 'https://www.nism.ac.in/certifications/nism-series-xix-d-category-i-and-ii-alternative-investment-fund-managers',
    supports:
      'AIF-manager certifications are a separate, role-linked subject. Fund category and key-team responsibilities affect the applicable requirements; they are not a universal fresher-admission test for every VC or PE job. Ask the fund’s compliance team which certification, if any, applies to your duties.',
    sourceType: 'Official programme',
  },
  {
    id: 'S26',
    organization: 'Goldman Sachs',
    title: 'India Summer Analyst — 2027 programme example',
    url: 'https://www.goldmansachs.com/careers/students/programs-and-internships/india/summer-analyst-program/',
    supports:
      'Checked 10 November 2026: the India programme includes FICC and Equities (Sales and Trading), lasts 8–10 weeks and lists students graduating in 2028. This documents one programme’s eligibility, not a universal rule or confirmation that a particular desk is currently accepting applications.',
    sourceType: 'Official programme',
  },
  {
    id: 'S27',
    organization: 'Goldman Sachs',
    title: 'FICC and Equities — work and skills',
    url: 'https://www.goldmansachs.com/careers/our-firm/FICC-and-equities',
    supports:
      'The official division description covers market-making, client execution, relationships and communicating market ideas. This supports distinguishing sales/trading preparation from quantitative research; it does not imply that every desk has the same technical test.',
    sourceType: 'Official hiring evidence',
  },
  {
    id: 'S28',
    organization: 'Trexquant',
    title: 'Quantitative Researcher — Early Career, Gurugram',
    url: 'https://trexquant.com/careers/E5752CE983',
    supports:
      'Official full-time early-career hiring example checked 10 November 2026. It specifies STEM education, Python, alpha research, simulations and hypothesis testing, with institution and graduation-year restrictions. Those restrictions are employer-specific. This is not an internship or a claim of eligibility for all applicants.',
    sourceType: 'Official hiring evidence',
  },
];

export const gradeBands = [
  {
    lane: 'Investment banking · buyout PE',
    target: 'Employer and route specific',
    weight: 'Check the published screen',
    reality:
      'Campus and experienced-hire routes differ. Strong academic record language is not evidence for a universal 8+/10 cutoff.',
    recovery:
      'Explore boutique IB, deals/FDD, valuation, eligible CA training or consulting, then apply with relevant work evidence.',
    sources: ['S01', 'S02', 'S04'],
  },
  {
    lane: 'Venture capital · growth investing',
    target: 'No universal score established',
    weight: 'Role and fund specific',
    reality:
      'Some programmes accept varied backgrounds; growth roles may ask for relevant transactions or research. Neither proves a common numeric cutoff.',
    recovery:
      'Build sector, research, operating or transaction evidence aligned to the exact fund mandate.',
    sources: ['S03', 'S21'],
  },
  {
    lane: 'Public markets · credit · deals',
    target: 'Read the exact vacancy',
    weight: 'Degree and role specific',
    reality:
      'Employer screening and regulatory qualifications are separate. A credential or portfolio does not waive a stated eligibility rule.',
    recovery:
      'Use relevant ratings, audit, valuation, banking or research work to build demonstrable analysis.',
    sources: ['S02', 'S08', 'S13'],
  },
  {
    lane: 'Markets · quant · model risk',
    target: 'Quantitative evidence where required',
    weight: 'Specialism specific',
    reality:
      'Markets and quantitative research are different jobs. Check the degree, subjects, coding and assessment requirements of the chosen team.',
    recovery:
      'Build reproducible analysis and target matching analytics, model-risk or trading-technology roles.',
    sources: ['S07'],
  },
  {
    lane: 'FP&A · treasury · risk · wealth · operations',
    target: 'Published eligibility comes first',
    weight: 'Employer specific',
    reality:
      'The same finance title can cover different work. Check graduation, qualification stage, activity and experience requirements before applying.',
    recovery:
      'Choose a first role for relevant work and feedback; future movement depends on evidence and available openings.',
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
      'Treat CA as a full professional route. ICAI industrial training requires Intermediate passed and at least 12 months of practical training; the 9–12 month training also requires advance notice and the prescribed registration arrangements. Choose work content carefully.',
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
      'Choose it when investment analysis is relevant to the target role. The charter requires all three exams, Practical Skills Modules, 4,000 qualifying work hours over at least 36 months, and approved membership; Level I alone is not the charter.',
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
      'Choose it for a relevant risk role. Exam registration has no education/experience prerequisite; certification requires both exams and two years of relevant full-time experience. Employer eligibility remains separate.',
    sources: ['S07'],
  },
  {
    name: 'NISM role exams',
    verdict: 'Regulatory or role-linked, not prestige badges',
    bestFor:
      'Match the activity: XV for covered research analysis, X-A/X-B for covered advice, V-A for mutual-fund distribution, VII for covered securities operations. Sales/non-core functions have separate XXV-A/XXV-B routes.',
    notEnough:
      'An unrelated NISM module does not demonstrate investing or deal skills. Specific regulated duties may require a particular module; ask the employer which one applies.',
    decision:
      'Take the exact series required by the job or regulation. Do not collect unrelated modules.',
    sources: ['S08', 'S09', 'S10', 'S13', 'S14', 'S22', 'S23', 'S24'],
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
      'No market-wide CGPA requirement. Kalaari’s fellowship example specifies no academic/professional background, while other funds may screen degrees or grades. Demonstrate startup exposure, research and writing, and check each vacancy’s criteria.',
    entryDoors: [
      'VC fellowship or internship',
      'Founder’s office, product or startup strategy',
      'Accelerator, incubator or ecosystem role',
      'Technical or operating role in one sector',
    ],
    hiringTest:
      'A short company note, market-sizing or sector case, founder judgment, partner interviews and references.',
    usefulCredentials:
      'No universal entry certificate. Learn accounting and venture economics as needed; regulated key-team duties may have specific NISM requirements. Confirm the role before paying for a credential.',
    proof:
      'Two concise IC-style memos, a 40–60 company market map and 10–20 original founder/customer conversations with attributable insights.',
    roadmap: [
      {
        period: 'Build the foundation',
        move: 'Choose one India-specific vertical; learn the value chain and write a falsifiable thesis.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Join a fellowship, accelerator, founder’s office or sector startup; build real sourcing and customer-research reps.',
      },
      {
        period: 'Apply with evidence',
        move: 'Recruit for analyst/associate work using a measured record of sourced companies, screens and research used in decisions.',
      },
    ],
    hardTruth:
      'Interest in startups is a starting point. Make your understanding of one market visible through research, considered founder/customer conversations and clear investment reasoning; hiring still depends on the fund’s needs.',
    sources: ['S03', 'S25'],
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
      'No universal grade cutoff is evidenced. Relevant scientific, engineering, clinical or sector training can support your case; translate it into commercial diligence and match the fund’s stated degree and experience requirements.',
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
        period: 'Build the foundation',
        move: 'Translate domain expertise into an investable landscape: buyers, budgets, regulation, unit economics and failure modes.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Build operator or research credibility and make useful introductions across the ecosystem.',
      },
      {
        period: 'Apply with evidence',
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
      'Requirements follow the function: talent, growth, community or finance. Show functional results and stakeholder references; do not assume the entry criteria or progression are the same as investing.',
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
        period: 'Build the foundation',
        move: 'Choose the platform function where you already have evidence and learn the portfolio’s recurring problems.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Build the function inside a startup, accelerator or services firm and quantify the result.',
      },
      {
        period: 'Apply with evidence',
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
      'Academic and prior-experience screens vary by fund. Campus placement evidence shows one entry route, not a universal GPA threshold. Build modelling and commercial-diligence evidence through relevant transaction or operating work.',
    entryDoors: [
      'Investment banking or M&A',
      'Big Four deals, FDD or valuation',
      'Strategy consulting',
      'Strategic finance or corporate development',
    ],
    hiringTest:
      'Timed operating model, company case, valuation, accounting questions, IC presentation and references.',
    usefulCredentials:
      'CA, CFA or a top recruiting MBA can help. Relevant diligence and execution work is stronger proof than a certificate-only profile; the required experience varies by team.',
    proof:
      'A driver-based model, public/private comps, cap-table and dilution work, a downside case and a 6–10 page investment memo.',
    roadmap: [
      {
        period: 'Build the foundation',
        move: 'Master accounting, unit economics, valuation, cap tables and integrated modelling.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Get live transaction, diligence or strategic-finance reps and keep a precise deal/work log.',
      },
      {
        period: 'Apply with evidence',
        move: 'Lateral when you can own a model, frame management questions and defend a full memo.',
      },
    ],
    hardTruth:
      'CFA Level I alone does not demonstrate that you can execute diligence or underwrite an investment. The roadmap is planning guidance, not a published minimum-experience rule.',
    sources: ['S04', 'S05', 'S06'],
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
      'No universal CGPA or feeder-experience rule. Selected campus routes exist, while many associate searches request relevant transaction experience. Check each team’s degree, experience and deal requirements before deciding whether to apply directly or via a feeder role.',
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
        period: 'Build the foundation',
        move: 'Choose a feeder route and learn accounting cold; become fast at a clean LBO without shortcuts.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Seek closed deals, management exposure, diligence ownership and high-quality modelling in IB, consulting or deals.',
      },
      {
        period: 'Apply with evidence',
        move: 'Recruit for associate roles only when you can defend industry, downside, debt and exit assumptions under pressure.',
      },
    ],
    hardTruth:
      'Direct buyout entry is selective. Keep a credible transaction, diligence or consulting route alongside campus applications; completing that route still does not guarantee a PE offer.',
    sources: ['S04', 'S05'],
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
      'Read the exact credit mandate and seniority. The Goldman Sachs associate example requests 3–6 years in named feeder fields and a strong academic record, without a numerical cutoff; monitoring and graduate-credit roles can have different requirements.',
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
        period: 'Build the foundation',
        move: 'Learn cash conversion, leverage, coverage, security, priority, covenants and insolvency/recovery logic.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Underwrite in ratings, banking, project finance, an NBFC, audit/FDD or credit research.',
      },
      {
        period: 'Apply with evidence',
        move: 'Lateral into alternatives after you can own a credit view and monitor it after close.',
      },
    ],
    hardTruth:
      'Credit analysis and portfolio monitoring can build relevant evidence, but moving into private-credit investing is competitive and depends on underwriting responsibility, team needs and hiring requirements.',
    sources: ['S02', 'S06', 'S07', 'S16'],
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
      'Match the degree and experience requirements of the actual role. Commercial analysis and sector/impact evidence are useful; a portfolio-analytics job and an investment-underwriting job are distinct entry routes.',
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
        period: 'Build the foundation',
        move: 'Choose one problem area and learn both its economics and on-the-ground beneficiary/customer reality.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Build sector, finance or measurement reps in an operator, research, consulting or investment role.',
      },
      {
        period: 'Apply with evidence',
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
      'No universal IB grade cutoff. Morgan Stanley’s Mumbai Global Centres internship example requires postgraduate study/equivalent and analytical ability, without numerical grades. Other campus, boutique and execution roles have their own screens and responsibilities.',
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
        period: 'Build the foundation',
        move: 'Master statements, valuation and presentation basics; rebuild one public-company model yourself.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Win the closest execution-heavy seat—boutique, Big Four, CA training, corp dev or bank internship.',
      },
      {
        period: 'Apply with evidence',
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
      'Check whether the role is CA articleship, industrial training, graduate analyst or experienced hiring. These have different eligibility. Relevant accounting, Excel and valuation work supports your application but does not override a stated cutoff.',
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
        period: 'Build the foundation',
        move: 'Build accounting and Excel depth; learn what each deals subteam actually owns.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Seek client-facing analysis, manager access and end-to-end work rather than repetitive data processing only.',
      },
      {
        period: 'Apply with evidence',
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
      'Degree and grade screens vary by employer. Show financial-statement analysis, a sourced model and a defensible investment case. For covered research activity, regulatory qualifications/certification are separate from the employer’s academic preferences.',
    entryDoors: [
      'Brokerage or independent research',
      'AMC, PMS or family office internship',
      'Ratings, data or research support',
      'Sector role followed by an investing lateral',
    ],
    hiringTest:
      'Stock pitch, accounting red flags, forecast drivers, valuation, variant perception and questions about how your view could be wrong.',
    usefulCredentials:
      'CFA aligns with investment analysis. NISM XV applies to covered research activity; sales/non-core roles may fall under XXV-A. Confirm qualifications and certification with the employer. An exam pass alone is not SEBI registration.',
    proof:
      'Two dated stock memos with a model, thesis, valuation, risks, disconfirming evidence and a post-mortem—not target-price theatre.',
    roadmap: [
      {
        period: 'Build the foundation',
        move: 'Choose one sector, read filings and build a model from raw statements.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Build a dated practice-research archive for applications and seek feedback from an analyst. Use public data and exclude confidential employer/client material.',
      },
      {
        period: 'Apply with evidence',
        move: 'Apply to relevant AMC, PMS, family-office or sell-side teams when you can defend the model, thesis, risks and changes in your view; selection is employer-specific.',
      },
    ],
    hardTruth:
      'Passing CFA Level I does not show that you can form, update or abandon an investment view.',
    sources: ['S06', 'S08', 'S13', 'S24'],
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
      'Requirements vary across FP&A, controllership and treasury. Check degree, CA/CMA stage, graduation year and any marks cutoff in the vacancy; build evidence in accounting, forecasting, cash management and communication for your chosen function.',
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
        period: 'Build the foundation',
        move: 'Learn statements, planning, variance analysis and how the target industry makes money.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Own a forecast, close process, treasury workflow or business unit—not only reporting production.',
      },
      {
        period: 'Apply with evidence',
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
      'Select a risk specialism before judging eligibility. Credit underwriting emphasises accounting and borrower analysis; model risk can demand quantitative degrees and coding. FRM registration has no academic prerequisite, but employers set separate hiring criteria.',
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
        period: 'Build the foundation',
        move: 'Pick one risk family. Credit, market, model and operational risk have different skill stacks.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Get a seat that makes or challenges real limits, ratings, models or underwriting decisions.',
      },
      {
        period: 'Apply with evidence',
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
    fit: 'People interested in products, market views and client needs, or in the distinct mathematical and programming craft of quantitative work.',
    reality:
      'Work ranges from sales and trading support to pricing, systematic research, execution, derivatives, desk strategy and quantitative risk.',
    academicSignal:
      'Separate markets sales/trading from quantitative research and model development. Quantitative subjects and coding depth matter in technical roles, while degree and grade thresholds are employer-specific. No single CGPA establishes readiness for all these jobs.',
    entryDoors: [
      'Bank markets or risk internship',
      'Quant research or analytics',
      'Model validation or market risk',
      'Data engineering around trading systems',
    ],
    hiringTest:
      'For sales/trading: market discussion, instrument payoffs, mental maths and clear reasoning. Quantitative roles additionally test probability, statistics, coding and research validation. Check the actual desk’s assessment.',
    usefulCredentials:
      'FRM can support risk study; CFA can support investment knowledge. Neither replaces the product and market judgement, or technical research skills, tested by the specific role.',
    proof:
      'For sales/trading, a sourced market and product brief with payoffs, catalysts and downside scenarios. For quantitative roles, a reproducible pricing, risk or strategy notebook with appropriate validation and documented limitations.',
    roadmap: [
      {
        period: 'Build the foundation',
        move: 'Learn instruments, market structure and risk; add probability, statistics, linear algebra and coding for quantitative roles.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Enter via markets, analytics, model risk or trading technology and learn from production constraints.',
      },
      {
        period: 'Apply with evidence',
        move: 'Move toward the desk or strategy whose test you can now pass with real research evidence.',
      },
    ],
    hardTruth:
      'A market view needs a clear risk case. A quantitative result needs validation against leakage, costs and changing conditions. Neither a persuasive pitch nor a backtest demonstrates live trading experience.',
    sources: ['S06', 'S07', 'S26', 'S27', 'S28'],
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
      'Check whether the job is regulated advice, distribution, relationship management or support. Academic criteria vary; the required NISM series follows the activity, and a certificate alone does not authorise independent advisory practice.',
    entryDoors: [
      'Bank or wealth-management analyst',
      'Mutual-fund or distribution role',
      'Client-service and portfolio support',
      'Research or financial-planning path',
    ],
    hiringTest:
      'Client scenario, product/risk comparison, suitability reasoning, communication and knowledge of the applicable compliance boundaries.',
    usefulCredentials:
      'Covered advice roles use NISM X-A/X-B; advice sales/non-core roles may use XXV-B. Mutual-fund distribution is a separate V-A route. Confirm the applicable activity, registration and transition rules with the employer.',
    proof:
      'An investment-policy statement, risk-profile rationale and model portfolio with costs, tax assumptions, rebalancing rules and plain-language explanation.',
    roadmap: [
      {
        period: 'Build the foundation',
        move: 'Choose advice, relationship management, research or operations and identify the exact regulatory requirement.',
      },
      {
        period: 'Gain relevant practice',
        move: 'Build product and client reps under an appropriately registered or regulated employer.',
      },
      {
        period: 'Apply with evidence',
        move: 'Progress toward advisory, portfolio or relationship ownership without crossing compliance boundaries.',
      },
    ],
    hardTruth:
      'Good sales is not automatically good advice. Reputation compounds only if suitability, disclosure and client outcomes are treated as core work.',
    sources: ['S09', 'S14', 'S22', 'S23'],
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

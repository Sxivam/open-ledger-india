export type BlueprintStage = {
  title: string;
  detail: string;
  tasks: string[];
};

export type PathwayBlueprint = {
  foundation: BlueprintStage;
  practice: BlueprintStage;
  routes: {
    id: string;
    title: string;
    detail: string;
    eligibility: string;
    tasks: string[];
  }[];
  milestone: BlueprintStage;
  opportunityTrack: string;
};

// These are preparation plans, not mandatory sequences or promised hiring outcomes.
// Choose one entry route; the other branches are alternatives, not extra requirements.
export const blueprints: Record<string, PathwayBlueprint> = {
  'seed-vc': {
    foundation: {
      title: 'Understand one startup market',
      detail:
        'Choose a specific Indian customer problem. Learn who pays, how the product reaches them and why a young company could build a durable advantage.',
      tasks: [
        'Map customers, competitors and distribution channels for one sector.',
        'Explain revenue, gross margin, acquisition cost, retention and cash runway using a worked example.',
        'Build a simple cap table and show how a funding round changes ownership.',
      ],
    },
    practice: {
      title: 'Write a venture screen',
      detail:
        'Create a short investment screen from public information and clearly attributed research. Separate facts, assumptions and questions you still need to answer.',
      tasks: [
        'Write a two-page company memo with market, team, product, economics and risks.',
        'Interview willing founders or customers and record what changed your thesis.',
        'Prepare a market map and a reasoned pass decision as well as an investment case.',
      ],
    },
    routes: [
      {
        id: 'fund-entry',
        title: 'Fund internship or fellowship',
        detail:
          'A direct but selective route into sourcing and research. Openings are intermittent and small teams can hire for a particular sector or immediate need.',
        eligibility:
          'Use the exact published student, graduate or experience criteria. A public posting does not mean every academic background is eligible.',
        tasks: [
          'Shortlist funds with an actual open role and a matching stage or sector thesis.',
          'Adapt one memo to the fund’s investment mandate and prepare a sourcing exercise.',
          'Ask whether the role owns research or sourcing, and how work receives investment-team feedback.',
        ],
      },
      {
        id: 'operator-route',
        title: 'Startup operating role first',
        detail:
          'Build product, growth, strategic-finance or founder’s-office experience before approaching investment teams. The value comes from decisions and sector access, not the title.',
        eligibility:
          'Match the operating function to skills you can already demonstrate. Moving from a startup into a fund requires a separate hiring process.',
        tasks: [
          'Choose a role with measurable customer, product, revenue or financial responsibilities.',
          'Keep a non-confidential record of decisions, outcomes and lessons about the sector.',
          'Translate one operating lesson into a company screen and investment thesis.',
        ],
      },
      {
        id: 'ecosystem-route',
        title: 'Accelerator or research route',
        detail:
          'An incubator, accelerator or sector-research role can build founder access and screening practice. Administrative programme work alone is weaker evidence for investing.',
        eligibility:
          'Programme and research roles set their own requirements. Confirm that the work includes analysis or company engagement rather than only event logistics.',
        tasks: [
          'Find teams where you can assess companies or research a defined sector.',
          'Produce a repeatable founder-screening template and document useful introductions.',
          'Use manager feedback to improve your thesis before applying to fund roles.',
        ],
      },
    ],
    milestone: {
      title: 'Defend an investment view',
      detail:
        'Your next application should show how you find a company, test the thesis and explain a pass. This is preparation evidence, not a promise of a VC offer.',
      tasks: [
        'Present one company in five minutes and defend the assumptions without slides.',
        'Identify the evidence that would make you reverse the decision.',
        'Prepare a targeted application with your memo and exact contribution to the team.',
      ],
    },
    opportunityTrack: 'VC & private capital',
  },
  'sector-vc': {
    foundation: {
      title: 'Connect technology to demand',
      detail:
        'Choose a domain you can understand deeply, then connect technical performance to customers, adoption constraints and commercial economics.',
      tasks: [
        'Map the value chain, paying customer and purchasing decision for one specialist sector.',
        'Explain which technical claims require independent verification.',
        'Identify capital intensity, regulatory dependencies and realistic adoption barriers.',
      ],
    },
    practice: {
      title: 'Build a diligence brief',
      detail:
        'A specialist memo should test both whether the product works and whether a company can earn attractive returns from it.',
      tasks: [
        'Compare three competing solutions on technical performance and total customer cost.',
        'Interview willing practitioners and distinguish their observations from your inferences.',
        'Write the investment case, failure cases and an unanswered-questions list.',
      ],
    },
    routes: [
      {
        id: 'specialist-fund',
        title: 'Specialist fund research role',
        detail:
          'Approach a domain-focused fund with relevant expertise and a concrete research sample. These teams may prioritise a particular technical or commercial background.',
        eligibility:
          'Check the role’s domain, qualification and experience requirements. A specialist degree is useful only when the mandate calls for that expertise.',
        tasks: [
          'Match the fund’s current sector thesis to your actual expertise.',
          'Submit a technical-commercial memo and explain what you can investigate independently.',
          'Prepare to translate technical uncertainty into investment risk.',
        ],
      },
      {
        id: 'domain-operator',
        title: 'Domain operating experience first',
        detail:
          'Work in an industry, research lab, product team or technical consulting practice. Build a record that helps you distinguish marketable products from impressive demonstrations.',
        eligibility:
          'Enter through your existing technical or professional skills. An operating role is a valuable destination itself; a later investment move is optional and competitive.',
        tasks: [
          'Own a product, field, research or customer problem with measurable outcomes.',
          'Learn the economics and buying process around your technical work.',
          'Convert non-confidential experience into a commercial diligence case.',
        ],
      },
      {
        id: 'sector-research',
        title: 'Sector research and consulting',
        detail:
          'Sector research, innovation programmes or consulting can combine primary research with business analysis before a specialist fund application.',
        eligibility:
          'Research methods, writing and domain literacy matter. Check whether the role requires a postgraduate degree or prior project experience.',
        tasks: [
          'Seek projects that include market adoption, customer economics or commercial diligence.',
          'Build an evidence-linked market map rather than a list of startup logos.',
          'Practice defending a thesis to both a technical reader and an investment reader.',
        ],
      },
    ],
    milestone: {
      title: 'Explain the commercial tradeoff',
      detail:
        'Show that you can value specialist knowledge without confusing a good technology with a good investment.',
      tasks: [
        'Explain the strongest technical claim and its main commercial limitation.',
        'Present adoption, funding and execution risks in plain language.',
        'Prepare a relevant expert network and a sample diligence plan for applications.',
      ],
    },
    opportunityTrack: 'VC & private capital',
  },
  'vc-platform': {
    foundation: {
      title: 'Choose a portfolio function',
      detail:
        'Choose talent, growth, community, partnerships or portfolio finance. Platform work helps companies operate; it is not automatically an investment-team apprenticeship.',
      tasks: [
        'Choose one function and describe a recurring founder problem it solves.',
        'Define useful outcome measures such as hiring conversion, collections or qualified introductions.',
        'Read role descriptions to separate portfolio support from investment underwriting.',
      ],
    },
    practice: {
      title: 'Design an operating playbook',
      detail:
        'Create an implementable workflow with owners, inputs and measures. Use real non-confidential work where possible; label simulated examples clearly.',
      tasks: [
        'Build a hiring funnel, growth diagnostic, reporting pack or founder-programme plan.',
        'Explain how a small team would run it and what data it needs.',
        'Collect feedback from a practitioner and revise the workflow.',
      ],
    },
    routes: [
      {
        id: 'startup-function',
        title: 'Startup functional role first',
        detail:
          'Build delivery experience inside a startup before supporting several companies at a fund. Relevant execution usually matters more than a generic finance certificate.',
        eligibility:
          'Meet the requirements of the chosen function. Finance training does not by itself qualify someone for talent, growth or community work.',
        tasks: [
          'Choose a role with responsibility for a defined operating outcome.',
          'Record the starting problem, your intervention and the measured result.',
          'Turn the work into a playbook another founder could use.',
        ],
      },
      {
        id: 'accelerator-platform',
        title: 'Accelerator programme operations route',
        detail:
          'Accelerator work can develop founder-service and programme-delivery skills. Prefer responsibility for outcomes over event attendance or introductions without follow-through.',
        eligibility:
          'Check programme-management and stakeholder requirements. Portfolio finance, talent and technical programmes may require additional functional experience.',
        tasks: [
          'Design a founder-needs intake and a method for tracking resolution.',
          'Run or support one programme with clear feedback and follow-up.',
          'Document which interventions helped participating companies.',
        ],
      },
      {
        id: 'direct-platform',
        title: 'Fund platform vacancy route',
        detail:
          'Apply directly when your functional evidence matches a fund’s portfolio needs. This is a platform career, with its own progression and hiring tests.',
        eligibility:
          'Direct fund roles may require prior operating experience. Do not assume a platform offer includes a later move to investing.',
        tasks: [
          'Identify recurring needs among the fund’s portfolio companies.',
          'Tailor a functional case showing a useful first project.',
          'Clarify reporting lines, success measures and the scope of founder support.',
        ],
      },
    ],
    milestone: {
      title: 'Show an operating outcome',
      detail:
        'Present what improved because of your work and whether the method can be repeated across companies.',
      tasks: [
        'Explain one before-and-after result without claiming the team’s entire impact.',
        'Show the workflow, measurement and stakeholder feedback behind it.',
        'Apply to the platform function you want, with a concise case study.',
      ],
    },
    opportunityTrack: 'VC & private capital',
  },
  'growth-equity': {
    foundation: {
      title: 'Model a growing business',
      detail:
        'Connect accounting, customer economics, cash generation and funding needs. Growth can destroy value when acquisition costs or working capital absorb the gains.',
      tasks: [
        'Link income statement, balance sheet and cash flow for a public-company example.',
        'Build revenue from operating drivers rather than a single growth-rate assumption.',
        'Model dilution, financing needs and a downside operating scenario.',
      ],
    },
    practice: {
      title: 'Prepare a growth investment case',
      detail:
        'Use a clearly labelled public-data case to connect market opportunity, company economics, valuation and the terms that could affect returns.',
      tasks: [
        'Produce an operating model, comparable valuation and cap-table analysis.',
        'Write a concise memo covering management questions, downside and exit assumptions.',
        'Explain which claims need commercial or financial due diligence.',
      ],
    },
    routes: [
      {
        id: 'transactions-feeder',
        title: 'Transactions or diligence route',
        detail:
          'Investment banking, valuation and financial due diligence can build modelling and execution evidence. The specific assignment matters more than a broad employer label.',
        eligibility:
          'Analyst and trainee positions have different degree or CA-stage rules. A later growth-fund application may require relevant completed assignments or experience.',
        tasks: [
          'Target a team where juniors build models or analyse diligence questions.',
          'Keep a confidential-safe log of your exact responsibilities and feedback.',
          'Practice turning transaction analysis into an independent investment view.',
        ],
      },
      {
        id: 'strategy-finance',
        title: 'Strategy or operating finance route',
        detail:
          'Consulting, strategic finance and corporate-development work can supply commercial insight. Add transaction modelling if the role does not provide it.',
        eligibility:
          'Choose roles matching your existing analytical or operating skills. Routine reporting without decision ownership is less relevant to growth underwriting.',
        tasks: [
          'Own an analysis of unit economics, market entry or capital allocation.',
          'Document how evidence changed a management decision.',
          'Build a valuation and investment memo around the same business questions.',
        ],
      },
      {
        id: 'selective-direct',
        title: 'Selective direct analyst route',
        detail:
          'Some fund internships, analyst openings and campus processes offer direct access. Treat them as selective opportunities alongside a credible adjacent route.',
        eligibility:
          'Apply only where the current notice includes your degree, graduation year and experience profile. Campus recruitment may be restricted to participating institutions.',
        tasks: [
          'Identify publicly accessible openings or processes available through your institution.',
          'Practice a timed operating model and a short investment presentation.',
          'Prepare an adjacent transaction or strategic-finance application plan too.',
        ],
      },
    ],
    milestone: {
      title: 'Own the investment argument',
      detail:
        'Move beyond a technically correct model to a view on whether the investment makes sense at the proposed price and terms.',
      tasks: [
        'Defend the main value driver, downside and valuation assumptions.',
        'Explain which diligence finding would change price or stop the investment.',
        'Present your own work contribution and the feedback that improved it.',
      ],
    },
    opportunityTrack: 'VC & private capital',
  },
  'buyout-pe': {
    foundation: {
      title: 'Learn acquisition cash flows',
      detail:
        'Understand purchase price, leverage, operating cash generation and exit value. A leveraged-buyout model is an analysis tool, not evidence that a deal is attractive.',
      tasks: [
        'Build sources and uses, debt balances, interest and a cash-sweep schedule.',
        'Connect working capital and capital expenditure to debt repayment.',
        'Calculate return sensitivities for lower growth, lower margins and a weaker exit.',
      ],
    },
    practice: {
      title: 'Underwrite a buyout case',
      detail:
        'Use a public-company case to examine business quality, financing risk and realistic ownership improvements. Clearly label hypothetical transaction assumptions.',
      tasks: [
        'Build a clean LBO model with downside and financing constraints.',
        'Write a diligence list and a practical value-creation plan.',
        'Present why the business would or would not suit leveraged ownership.',
      ],
    },
    routes: [
      {
        id: 'ib-feeder',
        title: 'Investment banking feeder route',
        detail:
          'M&A or relevant financing work can build transaction modelling and execution experience before buyout recruiting. Access depends on real deal work and the fund’s criteria.',
        eligibility:
          'First meet the banking role’s requirements. Later associate vacancies often seek experienced candidates; there is no guaranteed transfer after a fixed number of years.',
        tasks: [
          'Seek work on valuation, diligence, financing or transaction execution.',
          'Record your model ownership and judgement on specific assignments without disclosing confidential data.',
          'Practice LBO tests and explain a transaction’s downside beyond the presentation narrative.',
        ],
      },
      {
        id: 'consulting-deals',
        title: 'Consulting or CA deals route',
        detail:
          'Commercial diligence, financial due diligence and transaction advisory can be adjacent routes. Candidates must close any gap in financing, valuation or execution skills.',
        eligibility:
          'CA training or qualification can be relevant to accounting-heavy teams; consulting has separate selection routes. Each fund decides which experience it accepts.',
        tasks: [
          'Choose assignments analysing earnings quality, markets, customers or acquisition risks.',
          'Link diligence findings to cash flow, purchase price and investment decisions.',
          'Add debt modelling and transaction mechanics where your job provides less exposure.',
        ],
      },
      {
        id: 'selective-campus',
        title: 'Selective campus recruitment route',
        detail:
          'A limited number of institutions and employers offer direct investing recruitment. This is an access channel, not a reason to assume an MBA guarantees private equity.',
        eligibility:
          'Participation depends on the institution, employer process and candidate eligibility. Prior experience may still be material even within campus recruiting.',
        tasks: [
          'Check actual fund recruiting at the institution and the role level offered.',
          'Prepare accounting, LBO and investment-case interviews before the process.',
          'Keep a parallel feeder-role plan if direct investing does not work out.',
        ],
      },
    ],
    milestone: {
      title: 'Defend a full ownership case',
      detail:
        'Show business judgement, accounting precision and a credible account of your own transaction work. A completed learning checklist does not replace required professional experience.',
      tasks: [
        'Explain downside debt service and the limits of the proposed capital structure.',
        'Separate value creation from returns caused only by leverage or multiple expansion.',
        'Prepare a deal discussion with exact personal responsibilities and lessons.',
      ],
    },
    opportunityTrack: 'VC & private capital',
  },
  'private-credit': {
    foundation: {
      title: 'Follow cash and repayment',
      detail:
        'Start with the borrower’s ability to repay. Learn cash conversion, liquidity, leverage, coverage, security and priority before treating yield as the main attraction.',
      tasks: [
        'Reconcile accounting profit to operating cash flow and debt service.',
        'Build a borrowing and repayment schedule with a liquidity downside.',
        'Explain covenants, security and recovery assumptions in a hypothetical credit case.',
      ],
    },
    practice: {
      title: 'Write a downside credit memo',
      detail:
        'Use public information to form a lender’s view, including what could fail and how the exposure would be monitored after funding.',
      tasks: [
        'Analyse leverage, cash conversion, coverage and refinancing needs.',
        'Propose monitoring indicators and covenant questions, labelling assumptions.',
        'Write a recommendation with key risks, downside and information still missing.',
      ],
    },
    routes: [
      {
        id: 'underwriting-route',
        title: 'Bank or NBFC underwriting',
        detail:
          'Corporate lending, project finance and NBFC credit roles can build borrower analysis and repayment judgement before a private-credit application.',
        eligibility:
          'Check the precise lending segment and role requirements. Retail collections, sales and transaction processing are different from corporate underwriting.',
        tasks: [
          'Seek a role preparing or challenging credit proposals and cash-flow analysis.',
          'Learn how approvals, documentation and post-disbursement monitoring connect.',
          'Keep examples of how analysis changed terms, limits or the credit recommendation.',
        ],
      },
      {
        id: 'ratings-research',
        title: 'Ratings or credit research',
        detail:
          'A ratings or research team can provide repeated borrower and sector analysis. Develop transaction-structure and documentation knowledge alongside financial analysis.',
        eligibility:
          'Employers specify their own finance, economics, accounting or other degree requirements. Match the vacancy’s level rather than assuming a certificate is sufficient.',
        tasks: [
          'Analyse several borrowers in the same sector using a consistent framework.',
          'Track what drove rating changes or credit deterioration.',
          'Add a lender-style monitoring and recovery discussion to your research sample.',
        ],
      },
      {
        id: 'private-credit-entry',
        title: 'Private credit analyst opening',
        detail:
          'Some internships, industrial-training and junior credit roles permit more direct entry. Distinguish investment underwriting from middle-office and portfolio-reporting positions.',
        eligibility:
          'Apply only when the current role accepts your degree, CA stage and experience. Associate investing roles can require substantial relevant professional experience.',
        tasks: [
          'Read the responsibilities to identify underwriting, monitoring or operations work.',
          'Prepare a cash-flow model and credit memo that match the team’s mandate.',
          'Confirm which decisions and outputs the junior hire will actually support.',
        ],
      },
    ],
    milestone: {
      title: 'Own a monitored credit view',
      detail:
        'Show how your original lending view would evolve when cash flows, covenants or collateral expectations change.',
      tasks: [
        'Explain repayment in the base case and loss risk in the downside.',
        'Set a monitoring plan with observable warning indicators.',
        'Prepare a case discussion linking your actual experience to the advertised credit role.',
      ],
    },
    opportunityTrack: 'VC & private capital',
  },
  'impact-investing': {
    foundation: {
      title: 'Connect impact and economics',
      detail:
        'Choose one problem area and understand both the paying customer and intended beneficiary. Social or environmental value does not remove commercial or measurement risk.',
      tasks: [
        'Map the problem, beneficiaries, payer and delivery model.',
        'Explain unit economics and the funding needed to scale the solution.',
        'Separate outputs from outcomes and identify attribution limitations.',
      ],
    },
    practice: {
      title: 'Build an impact investment case',
      detail:
        'Combine a commercial memo with a realistic measurement plan. Use evidence to test the claimed impact rather than repeating a company’s mission statement.',
      tasks: [
        'Build an operating model and explain the commercial risks.',
        'Write a theory of change with a small, measurable outcome set.',
        'Identify impact risks, unintended effects and evidence needed to test additionality.',
      ],
    },
    routes: [
      {
        id: 'sector-operator',
        title: 'Mission-led operating experience route',
        detail:
          'Work in climate, health, agriculture, financial inclusion or another chosen sector. Learn delivery constraints before turning operating knowledge into an investment argument.',
        eligibility:
          'Choose a function suited to your skills and the organisation’s requirements. Mission alignment alone is not a substitute for functional competence.',
        tasks: [
          'Own a customer, delivery or financial problem at a relevant organisation.',
          'Document both commercial results and limits in the impact evidence.',
          'Turn one operating challenge into an investment diligence question.',
        ],
      },
      {
        id: 'finance-feeder',
        title: 'Finance or project underwriting',
        detail:
          'Relevant lending, project finance, deals or investing work can supply financial discipline. Add domain and impact-measurement knowledge before switching mandates.',
        eligibility:
          'Meet the requirements of the financial role first. Climate and infrastructure positions may need sector-specific project or technical experience.',
        tasks: [
          'Analyse a transaction or project in your chosen impact sector.',
          'Link funding structure and commercial incentives to the intended outcomes.',
          'Build an impact measurement supplement to a conventional investment memo.',
        ],
      },
      {
        id: 'measurement-research',
        title: 'Research or portfolio analytics',
        detail:
          'Economics research, development consulting and portfolio analytics can build evidence and measurement skills. They are not automatically investment-decision roles.',
        eligibility:
          'Check the role’s research methods, qualification and experience requirements. Add financial modelling if your work primarily evaluates outcomes.',
        tasks: [
          'Work on a sector study, portfolio dataset or outcome evaluation.',
          'State data limitations and avoid attributing every observed change to the intervention.',
          'Connect research findings to a financing or investment decision.',
        ],
      },
    ],
    milestone: {
      title: 'Defend both investment cases',
      detail:
        'Be ready for separate scrutiny of the commercial return and the claimed impact. Neither argument can stand in for the other.',
      tasks: [
        'Present the business case and its downside assumptions.',
        'Explain the outcome measures, evidence gaps and impact risks.',
        'Apply with a sector-specific sample and an honest account of your contribution.',
      ],
    },
    opportunityTrack: 'VC & private capital',
  },
  'ib-ma': {
    foundation: {
      title: 'Build the accounting base',
      detail:
        'Become comfortable with statements, valuation and transaction mechanics. Clean analysis and precise presentation are both part of investment-banking work.',
      tasks: [
        'Link the three financial statements and explain common accounting adjustments.',
        'Build an enterprise-to-equity bridge, comparable valuation and DCF.',
        'Explain the commercial rationale and financing of one public transaction.',
      ],
    },
    practice: {
      title: 'Create a transaction work sample',
      detail:
        'Rebuild a public-company model from filings, then use it in a concise transaction pitch. Avoid paid templates you cannot explain.',
      tasks: [
        'Produce an integrated model with checks, assumptions and source references.',
        'Compare valuation methods and explain why their answers differ.',
        'Present a short acquisition or fundraising rationale with risks.',
      ],
    },
    routes: [
      {
        id: 'bank-programme',
        title: 'Structured bank programme route',
        detail:
          'Summer internships and analyst programmes can offer direct recruiting, with defined degree and graduation windows. Open application does not mean unrestricted eligibility.',
        eligibility:
          'Check each India programme’s current degree, graduation year, work-right and campus restrictions. Do not substitute another bank’s eligibility rules.',
        tasks: [
          'Track suitable programme windows and confirm eligibility before applying.',
          'Practice numerical, accounting, valuation and behavioural interviews.',
          'Prepare a company discussion and explain why the particular team fits.',
        ],
      },
      {
        id: 'boutique-route',
        title: 'Boutique investment banking route',
        detail:
          'Smaller advisory teams may hire off-cycle and give broad transaction responsibilities. Quality varies, so assess the work and supervision carefully.',
        eligibility:
          'Match the advertised internship or analyst requirements. Confirm pay, availability, training and responsibilities rather than assuming a title means live deal work.',
        tasks: [
          'Identify boutiques active in a sector or transaction size you understand.',
          'Send a tailored application with a model or short sector note.',
          'Ask what juniors build, write and present during an actual mandate.',
        ],
      },
      {
        id: 'advisory-feeder',
        title: 'Deals or CA training route',
        detail:
          'Valuation, due diligence, eligible CA training and corporate-development work can build relevant skills before a banking lateral. The move is competitive, not automatic.',
        eligibility:
          'CA training requires the applicable ICAI and employer eligibility. Other advisory roles have their own degree and experience requirements.',
        tasks: [
          'Choose work involving models, valuation, diligence or transaction materials.',
          'Track exact analytical responsibilities and feedback on each assignment.',
          'Close gaps in pitching and execution before applying to banking teams.',
        ],
      },
    ],
    milestone: {
      title: 'Pass the model defence',
      detail:
        'Show that you can produce accurate work, explain the assumptions and respond to challenges without relying on a template.',
      tasks: [
        'Complete a timed modelling or valuation exercise and review every check.',
        'Explain accounting effects and transaction rationale aloud.',
        'Build an application list around the current entry route you can credibly access.',
      ],
    },
    opportunityTrack: 'Investment banking',
  },
  'deals-valuation': {
    foundation: {
      title: 'Separate the deals disciplines',
      detail:
        'Valuation, financial due diligence and transaction execution are distinct jobs. Learn what the chosen team produces before choosing a qualification or employer.',
      tasks: [
        'Compare the work of valuation, financial due diligence and M&A execution teams.',
        'Learn working capital, earnings quality and enterprise-to-equity adjustments.',
        'Build reliable Excel checks and a clean source-to-analysis trail.',
      ],
    },
    practice: {
      title: 'Prepare a diligence workpaper',
      detail:
        'Show how reported numbers become a decision-ready analysis. Explain each adjustment rather than treating it as a mechanical add-back.',
      tasks: [
        'Build a simplified reported-to-adjusted EBITDA bridge.',
        'Analyse working-capital movements and potential one-off items.',
        'Create a valuation summary with assumptions, limitations and source references.',
      ],
    },
    routes: [
      {
        id: 'direct-advisory',
        title: 'Advisory analyst or internship',
        detail:
          'Apply to a specialist valuation or transaction-advisory team accepting your profile. Broad firm names can hide very different work content.',
        eligibility:
          'Read team-specific degree, experience and accounting requirements. Some roles prefer or require CA qualification; others recruit graduates or interns.',
        tasks: [
          'Shortlist teams by the deliverables juniors actually own.',
          'Prepare for an accounting, valuation or working-capital case.',
          'Ask about client work, review quality and progression within the subteam.',
        ],
      },
      {
        id: 'ca-articleship',
        title: 'CA articleship or training',
        detail:
          'Relevant articleship or industrial training can provide accounting and valuation exposure. These are distinct training arrangements with specific eligibility rules.',
        eligibility:
          'Confirm your CA stage, remaining training period and recognised training arrangement with ICAI and the employer. Do not treat every internship as recognised CA training.',
        tasks: [
          'Check that the vacancy and training arrangement fit your current CA stage.',
          'Choose assignments involving valuation, transaction analysis or diligence.',
          'Maintain a learning log of adjustments and review comments without sharing client material.',
        ],
      },
      {
        id: 'audit-lateral',
        title: 'Audit to diligence move',
        detail:
          'Audit can build accounting depth before a move to financial due diligence. Add transaction judgement and cash-flow analysis rather than relabelling routine audit work.',
        eligibility:
          'Internal and external moves depend on openings, employer policy and demonstrated skills. Audit experience does not guarantee a transfer.',
        tasks: [
          'Translate audit findings into earnings, working-capital or debt questions.',
          'Build a transaction-style case using public or synthetic data.',
          'Prepare examples of judgement and seek relevant project exposure when available.',
        ],
      },
    ],
    milestone: {
      title: 'Explain every material adjustment',
      detail:
        'Demonstrate accounting accuracy and the judgement to explain how an adjustment affects a valuation or transaction decision.',
      tasks: [
        'Defend a working-capital or earnings-quality finding with evidence.',
        'Explain what the analysis does not prove and what needs further diligence.',
        'Present a concise case matched to the chosen advisory subteam.',
      ],
    },
    opportunityTrack: 'Investment banking',
  },
  'public-markets': {
    foundation: {
      title: 'Read filings before forecasts',
      detail:
        'Choose one sector and understand its business drivers from primary disclosures. Accounting and industry structure come before a target price.',
      tasks: [
        'Read annual reports and results for comparable listed companies.',
        'Reconcile revenue, profit and cash-flow trends with operating drivers.',
        'Build a forecast and identify accounting or governance questions.',
      ],
    },
    practice: {
      title: 'Write a dated research memo',
      detail:
        'Prepare an educational work sample with sources, assumptions and risks. A research exercise is not permission to sell recommendations or provide regulated advice.',
      tasks: [
        'Write a thesis, valuation, downside case and disconfirming evidence list.',
        'Build a model whose key assumptions can be traced to disclosures or labelled estimates.',
        'Revisit the thesis after new results and record what you got wrong.',
      ],
    },
    routes: [
      {
        id: 'research-desk',
        title: 'Brokerage or research desk',
        detail:
          'Sell-side or independent-research work can build coverage, forecasts and writing under analyst review. Confirm the role’s actual research responsibilities.',
        eligibility:
          'Check employer qualification requirements and any applicable NISM certification or regulatory obligations. A certificate alone does not authorise independent regulated activity.',
        tasks: [
          'Prepare a sector pitch and accounting discussion for a suitable research opening.',
          'Ask whether juniors maintain models, write analysis and receive analyst feedback.',
          'Understand approval and compliance processes before any external publication.',
        ],
      },
      {
        id: 'investment-team',
        title: 'Investment team internship route',
        detail:
          'AMC, PMS and family-office internships may offer direct research exposure. Small teams can be selective and internships may not convert into permanent roles.',
        eligibility:
          'Match the current vacancy’s degree, experience and availability criteria. Do not infer investment responsibility from an operations role at an asset manager.',
        tasks: [
          'Match your sample sector to the investment team’s mandate.',
          'Prepare to defend valuation, risk and the reason your view could be wrong.',
          'Clarify supervision, outputs, duration and compensation before accepting.',
        ],
      },
      {
        id: 'adjacent-analysis',
        title: 'Research or sector experience',
        detail:
          'Ratings, analytical research support or a relevant industry role can supply accounting or sector depth. Add investment writing and valuation where the job lacks them.',
        eligibility:
          'Choose genuinely analytical work that fits your current profile. Data processing alone does not establish independent company-analysis experience.',
        tasks: [
          'Build expertise in a defined sector or analytical process.',
          'Create a public-data investment case outside confidential client work.',
          'Use a dated research record to show how your judgement develops.',
        ],
      },
    ],
    milestone: {
      title: 'Update the thesis honestly',
      detail:
        'A useful research record includes mistakes and changed views. Show process quality rather than an isolated winning stock or simulated return claim.',
      tasks: [
        'Explain a forecast miss and the changes it required.',
        'Defend valuation, downside and what the market may already expect.',
        'Prepare a research application with a clearly labelled work sample.',
      ],
    },
    opportunityTrack: 'Investment research',
  },
  'corp-finance': {
    foundation: {
      title: 'Connect operations to cash',
      detail:
        'Learn how sales, costs, working capital and capital spending drive the financial statements. Choose FP&A, treasury or accounting work deliberately.',
      tasks: [
        'Build a simple profit, cash and working-capital forecast.',
        'Explain the difference between accounting close, FP&A and treasury responsibilities.',
        'Practice Excel analysis and clear variance explanations for a business manager.',
      ],
    },
    practice: {
      title: 'Build a management decision pack',
      detail:
        'Turn a forecast into a recommendation. Use synthetic or public data and state assumptions rather than pretending it is a company’s internal plan.',
      tasks: [
        'Create a driver-based budget and actual-versus-plan bridge.',
        'Build a cash-runway or short-term liquidity scenario.',
        'Write a one-page recommendation tied to a business decision.',
      ],
    },
    routes: [
      {
        id: 'finance-programme',
        title: 'Finance internship or graduate programme',
        detail:
          'Advertised finance internships and graduate roles can provide a structured starting point. Check whether the work covers planning, accounting, reporting or rotational assignments.',
        eligibility:
          'Graduation year, degree and campus restrictions vary. Use only programmes that accept your profile and are publicly open or available through your institution.',
        tasks: [
          'Filter current opportunities for the finance function you want to learn.',
          'Prepare an Excel, accounting and variance-analysis case.',
          'Ask how juniors receive feedback and whether they own any forecast or decision support.',
        ],
      },
      {
        id: 'ca-accounting',
        title: 'CA or accounting experience route',
        detail:
          'Articleship, eligible industrial training, audit and controllership can build strong accounting foundations. Add planning and business partnering for an FP&A move.',
        eligibility:
          'CA training has formal eligibility and recognition requirements. Accounting vacancies may instead accept other commerce qualifications; read the exact role.',
        tasks: [
          'Choose assignments with close, reporting, tax, cash or control responsibilities.',
          'Explain how an accounting finding affects business performance or cash.',
          'Add a forecast and management commentary sample to your application.',
        ],
      },
      {
        id: 'startup-finance',
        title: 'Startup business finance route',
        detail:
          'A smaller company can offer broad exposure to revenue, costs, runway and reporting. Breadth is valuable when the role has reliable supervision and real ownership.',
        eligibility:
          'Match the required accounting, spreadsheet and communication skills. Confirm that the role offers finance work rather than only generic administration.',
        tasks: [
          'Demonstrate a forecast or runway model tailored to the company’s business.',
          'Ask which processes and decisions you would support or own.',
          'Build a record of accurate forecasts and recommendations adopted by managers.',
        ],
      },
    ],
    milestone: {
      title: 'Explain a business decision',
      detail:
        'Show how your analysis changed a forecast, cash action, control or operating decision, rather than reporting the number of dashboards produced.',
      tasks: [
        'Explain the most important variance and what the manager should do next.',
        'Describe forecast limitations and reconcile the recommendation with cash flow.',
        'Target FP&A, treasury or accounting roles using relevant evidence for that function.',
      ],
    },
    opportunityTrack: 'Corporate finance',
  },
  'risk-credit': {
    foundation: {
      title: 'Choose the risk discipline',
      detail:
        'Credit, market, model and operational risk have different skill requirements. Choose a discipline before collecting certifications or generic finance courses.',
      tasks: [
        'Compare borrower underwriting, market-risk analysis and operational-control roles.',
        'For your chosen discipline, learn the relevant accounting, statistics or process fundamentals.',
        'Explain a risk measure, its assumptions and a situation where it can mislead.',
      ],
    },
    practice: {
      title: 'Build a risk decision case',
      detail:
        'Use a credit memo, stress test or control assessment to show how analysis changes a limit, recommendation or escalation.',
      tasks: [
        'Create one case matched to credit, quantitative risk or operational risk.',
        'Test a downside scenario and document limitations in the data or method.',
        'Explain the proposed decision and what evidence would trigger a review.',
      ],
    },
    routes: [
      {
        id: 'credit-underwriting',
        title: 'Credit or ratings analyst',
        detail:
          'Borrower analysis, ratings and lending roles emphasise accounting, cash flow and sector judgement. This is a different preparation path from quantitative model validation.',
        eligibility:
          'Employers set degree and experience requirements. CA or CFA study may be relevant, but neither substitutes for the role’s explicit requirements.',
        tasks: [
          'Prepare a borrower case with ratios, liquidity and debt-service analysis.',
          'Apply to roles that prepare or challenge credit recommendations.',
          'Learn how monitoring changes the risk view after an initial approval.',
        ],
      },
      {
        id: 'quantitative-risk',
        title: 'Quantitative risk or validation',
        detail:
          'Market-risk and model-validation roles require stronger probability, statistics and coding. Reproducibility and model limitations matter as much as the final number.',
        eligibility:
          'Check mathematics, programming and degree requirements carefully. Some positions require advanced quantitative study or relevant professional experience.',
        tasks: [
          'Build a reproducible Python or R notebook for a risk or validation question.',
          'Test sensitivity, assumptions and behaviour outside the calibration sample.',
          'Practice explaining mathematical results to a non-technical risk stakeholder.',
        ],
      },
      {
        id: 'operations-controls',
        title: 'Operations and controls route',
        detail:
          'Securities operations, compliance and operational-control work can develop process and risk judgement. They are distinct careers, not guaranteed routes to trading or investing.',
        eligibility:
          'Check the role’s certifications, graduate-apprentice conditions and experience rules. Role-linked NISM requirements depend on the activity performed.',
        tasks: [
          'Map a trade, onboarding or reporting process and its main failure points.',
          'Prepare a control check, exception log and escalation example.',
          'Choose roles where you can investigate issues and improve controls, not only process volume.',
        ],
      },
    ],
    milestone: {
      title: 'Defend a risk recommendation',
      detail:
        'Show how you balance evidence, uncertainty and policy. A good risk explanation names both what the analysis supports and what it cannot establish.',
      tasks: [
        'Explain the proposed rating, limit, control or model challenge.',
        'Describe the important limitations and escalation conditions.',
        'Match your work sample and credential choices to one specific risk family.',
      ],
    },
    opportunityTrack: 'Risk & actuarial',
  },
  'markets-quant': {
    foundation: {
      title: 'Choose markets or quantitative work',
      detail:
        'Sales and trading, quantitative research and trading technology overlap but do not have identical hiring tests. Choose the craft and build its technical foundation.',
      tasks: [
        'Learn instrument payoffs, market structure and the role of liquidity.',
        'For quantitative work, practise probability, statistics, linear algebra and coding.',
        'Explain how transaction costs, execution and risk limits affect a trading idea.',
      ],
    },
    practice: {
      title: 'Create a role-matched market case',
      detail:
        'For sales and trading, prepare a market and product brief with payoffs, catalysts and risks. For quantitative roles, build a reproducible pricing, risk or strategy notebook. Choose the work sample your target role actually tests; a backtest is not a universal requirement.',
      tasks: [
        'Create a sourced market/product brief for sales and trading, or a reproducible notebook for quantitative work.',
        'For a market brief, explain payoffs, liquidity, costs and downside scenarios. For a notebook, test data leakage, assumptions and robustness; include costs and out-of-sample checks when testing a strategy.',
        'Explain the evidence supporting your view or method, what would invalidate it and what you cannot conclude from the exercise.',
      ],
    },
    routes: [
      {
        id: 'markets-programme',
        title: 'Bank markets programme route',
        detail:
          'Markets internships and analyst programmes can recruit for sales, trading and related functions. Allocation to a particular desk is not guaranteed.',
        eligibility:
          'Check the current programme’s degree, graduation window and location. Markets roles differ in technical requirements and some recruiting is campus-limited.',
        tasks: [
          'Track suitable programmes and learn the products used by their teams.',
          'Prepare mental maths, market discussion and instrument-payoff questions.',
          'Explain a market view, its risks and how new information would change it.',
        ],
      },
      {
        id: 'quant-research',
        title: 'Quantitative research internship route',
        detail:
          'Research and trading firms assess mathematical reasoning and implementation rigor. A financial certificate is not a replacement for their coding or quantitative tests.',
        eligibility:
          'Check required quantitative depth, degree and programming language. Some firms use highly selective technical and institution-specific processes.',
        tasks: [
          'Practise probability, statistics and coding problems with clear explanations.',
          'Prepare one rigorous notebook rather than many untested strategies.',
          'Show debugging, research validation and how you reject an apparent signal.',
        ],
      },
      {
        id: 'analytics-technology',
        title: 'Risk or trading technology',
        detail:
          'Model validation, market-risk analytics and trading-system roles can build relevant skills. A later desk or research move needs additional evidence and an actual opening.',
        eligibility:
          'Choose roles matching your quantitative or engineering background. Supporting a trading team does not automatically mean taking investment or trading decisions.',
        tasks: [
          'Build reliable data, pricing or risk tools for a defined user problem.',
          'Learn production constraints, testing and operational controls.',
          'Close the market-knowledge or research gap for the eventual role you want.',
        ],
      },
    ],
    milestone: {
      title: 'Defend your chosen market case',
      detail:
        'For sales and trading, defend a product explanation and market view under changing conditions. For quantitative work, defend the method, implementation and validation. Neither an educational brief nor a simulated result is evidence of live trading performance.',
      tasks: [
        'Present a market/product brief and answer payoff or catalyst questions, or reproduce your notebook and explain the important modelling choices.',
        'For sales and trading, test your view against a contrary scenario and explain liquidity and execution risks. For quantitative work, show relevant sensitivity, robustness and cost checks.',
        'Prepare for the actual coding, maths or markets test used by your target role.',
      ],
    },
    opportunityTrack: 'Banking & markets',
  },
  'wealth-advice': {
    foundation: {
      title: 'Separate advice from distribution',
      detail:
        'Choose investment advice, distribution, relationship management or portfolio support. These activities have different responsibilities and regulatory requirements.',
      tasks: [
        'Compare the work and incentives of an adviser, distributor and client-support analyst.',
        'Learn risk profiling, diversification, liquidity, costs and product due diligence.',
        'Identify the qualifications and certifications relevant to the specific activity.',
      ],
    },
    practice: {
      title: 'Build a client case study',
      detail:
        'Use a fictional client to practise clear, suitable reasoning. This is an educational sample, not personalised advice to a real investor.',
      tasks: [
        'Write a fictional investment-policy statement with goals, constraints and risk capacity.',
        'Compare product costs, risks, liquidity and conflicts without promising returns.',
        'Explain a rebalancing and review process in plain language.',
      ],
    },
    routes: [
      {
        id: 'advisory-support',
        title: 'Registered advisory support route',
        detail:
          'Work under an appropriately registered advisory business to learn research, client documentation and suitability processes within the authorised role.',
        eligibility:
          'Check the exact qualification, certification and experience requirements for the activity. Passing an exam is not by itself permission to offer independent regulated advice.',
        tasks: [
          'Confirm the employer’s role scope and supervision before applying.',
          'Prepare a fictional suitability case with explicit assumptions and limitations.',
          'Learn approval, disclosure and record-keeping processes used by the firm.',
        ],
      },
      {
        id: 'distribution-relationship',
        title: 'Distribution or relationship route',
        detail:
          'Banking, mutual-fund distribution and wealth relationship roles develop product and client skills. Be clear about sales targets, incentives and the limits of the role.',
        eligibility:
          'Meet any role-specific certification and registration conditions stated by the employer. Distribution and investment advice are not interchangeable authorisations.',
        tasks: [
          'Prepare product comparisons that explain costs and risks accurately.',
          'Ask about targets, incentive structure, supervision and client-service responsibilities.',
          'Practise client conversations that avoid unsuitable products and return promises.',
        ],
      },
      {
        id: 'portfolio-client-support',
        title: 'Portfolio or client-support route',
        detail:
          'Research support, reporting and client-service roles can provide an entry without immediate relationship ownership. Advancement depends on the skills and permissions of the destination role.',
        eligibility:
          'Check graduate eligibility, finance skills and operational requirements. Supporting portfolios does not authorise personal recommendations to clients.',
        tasks: [
          'Build a clear portfolio-reporting and client-query example using fictional data.',
          'Learn reconciliation, reporting accuracy and escalation processes.',
          'Develop the additional product, client or research skills needed for your chosen next role.',
        ],
      },
    ],
    milestone: {
      title: 'Explain a suitable client choice',
      detail:
        'Show good judgement about needs, constraints, disclosures and conflicts. Strong communication includes knowing when to escalate rather than advise beyond your role.',
      tasks: [
        'Defend the fictional client case and explain why an attractive product may still be unsuitable.',
        'State the costs, uncertainties and assumptions without making a return promise.',
        'Apply to a clearly defined role and confirm its compliance and supervision requirements.',
      ],
    },
    opportunityTrack: 'Asset management',
  },
};

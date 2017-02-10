//Dashboard Data. Storing a lot of variables here for organizational reasons. 

//Set up and load 3D array with rubric answers: [design steps(12)][rubric questions(7)][rubric answer scores/text(6)]
var ansText = new Array(12);
var ansArraySize = [7, 2, 4, 3, 5, 5, 5, 5, 5, 5, 5, 5];
//0 - Step A; 1 - Step B; etc.

var arrayOffset = [0,
    ansArraySize[0],
    ansArraySize[0] + ansArraySize[1],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3] + ansArraySize[4],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3] + ansArraySize[4] + ansArraySize[5],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3] + ansArraySize[4] + ansArraySize[5] + ansArraySize[6],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3] + ansArraySize[4] + ansArraySize[5] + ansArraySize[6] + ansArraySize[7],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3] + ansArraySize[4] + ansArraySize[5] + ansArraySize[6] + ansArraySize[7] + ansArraySize[8],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3] + ansArraySize[4] + ansArraySize[5] + ansArraySize[6] + ansArraySize[7] + ansArraySize[8] + ansArraySize[9],
    ansArraySize[0] + ansArraySize[1] + ansArraySize[2] + ansArraySize[3] + ansArraySize[4] + ansArraySize[5] + ansArraySize[6] + ansArraySize[7] + ansArraySize[8] + ansArraySize[9] + ansArraySize[10]
]
for (iii = 0; iii < 12; iii++) {
    for (jjj = 0; jjj < 7; jjj++) {
        ansText[iii] = new Array(7);
        for (kkk = 0; kkk < 6; kkk++) {
            ansText[iii][jjj] = new Array(6);
        }
    }
}

//12 steps, 7 possible questions, 6 answers
ansText[0][0] = [
    "very clear and objective.",
    "clear and objective.",
    "somewhat clear and objective.",
    "somewhat clear and/or objective.",
    "unclear.",
    "missing (cannot be inferred from information included)."
];
ansText[0][1] = [
    "in considerable depth.",
    "in some depth.",
    "in adequate depth.",
    "in superficial depth.",
    "unclear.",
    "missing (cannot be inferred from information included)."
];
ansText[0][2] = [
    "well elaborated.",
    "generally elaborated.",
    "imprecisely or generally elaborated.",
    "minimally elaborated.",
    "unelaborated and/or is clearly subjective.",
    "not elaborated (cannot be inferred from information included)."
];
ansText[0][3] = [
    "highlights the concerns of many primary stakeholders.",
    "highlights the concerns of some primary stakeholders.",
    "highlights the concerns of at least a few primary stakeholders.",
    "highlights the concerns of only one or two stakeholders.",
    "highlights the concerns of no (or an indeterminate number of ) primary stakeholders.",
    "highlights the concerns of no (or an indeterminate number of) primary stakeholders."
];
ansText[0][4] = [
    "comprehensive timely, and consistently credible sources.",
    "various, and generally credible sources.",
    "a few timely and credible sources.",
    "insufficient, outdated or dubious sources.",
    "sources that are overly general, outdated, and/or of dubious credibility.",
    "essentially only the opinion of the researcher."
];
ansText[0][5] = [
    "consistently",
    "generally",
    "not necessarily",
    "little",
    "little or no",
    "no"
];
ansText[0][6] = [
    "Multiple",
    "Multiple",
    "At least a few",
    "At least a few but possibly not",
    "No",
    "No"
];
ansText[1][0] = [
    "a wide array of clearly identified and consistently credible sources.",
    "a variety of clearly identified and consistently credible sources.",
    "several—but not necessarily varied—clearly identified and generally credible sources.",
    "a limited number of sources, some of which may not be clearly identified and/or credible.",
    "only one or two sources that may not be clearly identified and/or credible.",
    "missing or minimal (a single source that is not clearly identified and/or credible)."
];
ansText[1][1] = [
    "is consistently clear, detailed, and supported by relevant data.",
    "is clear and is generally detailed and supported by relevant data.",
    "is generally clear and contains some detail and relevant supporting data.",
    "is overly general and contains little detail and/or relevant supporting data.",
    "is vague and is missing any relevant details and/or relevant supporting data.",
    "cannot be inferred from information intended as analysis of past and/or current attempts to solve the problem."
];
ansText[2][0] = [
    "are listed and prioritized and are clear and detailed.",
    "are listed and prioritized and are generally clear and detailed.",
    "are listed and prioritized and are generally clear and somewhat detailed.",
    "are listed and prioritized but some or all may be incomplete and/or lack specificity.",
    "listing, format and prioritization is attempted but these may be partial and/or overly general.",
    "are not present or are too vague."
];
ansText[2][1] = [
    "are consistently objective and measurable.",
    "are nearly always objective and measurable.",
    "are generally objective and measurable.",
    "may be only sometimes objective and/or measurable.",
    "are insufficiently measurable.",
    "are not measurable."
];
ansText[2][2] = [
    "would be highly likely to lead to a tangible and viable problem solution.",
    "would be likely to lead to a tangible and viable problem solution.",
    "have a potential to lead to a tangible and viable problem solution.",
    "do not clearly lead to a tangible and viable problem solution.",
    "cannot lead to a tangible and viable problem solution.",
    "cannot lead to a tangible and viable problem solution."
];
ansText[2][3] = [
    "many if not all primary stakeholder groups.",
    "several primary stakeholder groups.",
    "at least a few primary stakeholder groups.",
    "only one primary stakeholder groups.",
    "no primary stakeholder groups.",
    "no primary stakeholder groups."
];
ansText[3][0] = [
    "was comprehensive, iterative, and consistently defensible (viable design highly likely).",
    "was thorough, iterative, and generally defensible (viable design likely).",
    "was adequate, generally iterative and defensible (viable design is possible).",
    "was partial or overly general and only somewhat iterative and/or defensible (raising issues with the  design viability).",
    "was incomplete or minimally iterative and/or defensible (raising issues with the  design viability).",
    "was not evident that there was an attempt."
];
ansText[3][1] = [
    "was well-justified and demonstrated attention to all design requirements.",
    "was justified and demonstrated attention to most if not all design requirements.",
    "was explained with reference to at lease some design requirements.",
    "was not sufficiently explained with reference to design requirements.",
    "lacked support related to design requirements.",
    "was not attempted or evidence not provided."
];
ansText[3][2] = [
    "has considerable merit and would easily support repetition and testing for effectiveness by others.",
    "would support repetition and testing for effectiveness by others.",
    "might not clearly or fully support repetition and testing for effectiveness by others.",
    "has insufficient detail to allow for testing for replication of results.",
    "is lacking to the point that the design solution cannot be tested.",
    "cannot be executed or does not exist."
];

for (jj = ansArraySize[1]; jj < 7; jj++) {//Element B backfill
    ansText[1][jj] = ["Score 5", "Score 4", "Score 3", "Score 2", "Score 1", "Score 0"];
}
for (jj = ansArraySize[2]; jj < 7; jj++) {//Element C backfill
    ansText[2][jj] = ["Score 5", "Score 4", "Score 3", "Score 2", "Score 1", "Score 0"];
}
for (jj = ansArraySize[3]; jj < 7; jj++) {//Element D backfill
    ansText[3][jj] = ["Score 5", "Score 4", "Score 3", "Score 2", "Score 1", "Score 0"];
}
for (iii = 4; iii < 12; iii++) {//Remaining Elements backfill
    for (jjj = 0; jjj < 6; jjj++) {
        ansText[iii][jjj] = ["Score 5", "Score 4", "Score 3", "Score 2", "Score 1", "Score 0"];
    }
}
//overwrite the default to add new rubrics
ansText[6][0] = [
    "clearly and fully explained.",
    "clearly and adequately explained.",
    "clearly and adequately explained.",
    "only somewhat clearly and/or completely explained.",
    "only minimally explained.",
    "is unclear or is missing altogether."
];
ansText[6][1] = [
    "constructed with enough detail to assure that objective data on all or nearly all design reqmts could be determined.",
    "constructed with enough detail to assure that objective data on many or nearly all design reqmts could be determined.",
    "constructed with enough detail to assure that objective data on some design reqmts could be determined.",
    "not constructed with enough detail to assure that objective data on at least one design reqmts could be determined.",
    "constructed with enough detail to assure that objective data on at least a few design reqmts could be determined.",
    "not applicable to any design requirements and/or functional claims."
];
ansText[6][2] = [
    "All",
    "Most",
    "Some",
    "A few",
    "No more than one",
    "None of the"
];
ansText[6][3] = [
    "A well supported",
    "A generally supported",
    "An adequately supported",
    "Insufficient",
    "No",
    "No"
];
//////////////



//Rubric Data structure 
eleA_rubric = {"element": "Element A", "rubric": [
        {"preanswer": "1. Problem Identification. Problem identification is ", "answer": [
                "very clear and objective.",
                "clear and objective.",
                "somewhat clear and objective.",
                "somewhat clear and/or objective.",
                "unclear.",
                "missing (cannot be inferred from information included)."],
            "postanswer": ""},
        {"preanswer": "2. Problem Definition. Problem Definition is ", "answer": [
                "in considerable depth.",
                "in some depth.",
                "in adequate depth.",
                "in superficial depth.",
                "unclear.",
                "missing (cannot be inferred from information included)."],
            "postanswer": ""},
        {"preanswer": "3. Problem Elaboration. Problem Elaboration is ", "answer": [
                "well elaborated.",
                "generally elaborated.",
                "imprecisely or generally elaborated.",
                "minimally elaborated.",
                "unelaborated and/or is clearly subjective.",
                "not elaborated (cannot be inferred from information included)."],
            "postanswer": ""},
        {"preanswer": "4. Concern of primary stakeholders. Justification of the problem highlights the concerns of ", "answer": [
                "many primary stakeholders.",
                "some primary stakeholders.",
                "at least a few primary stakeholders.",
                "only one or two stakeholders.",
                "no (or an indeterminate number of ) primary stakeholders.",
                "no (or an indeterminate number of) primary stakeholders."],
            "postanswer": ""},
        {"preanswer": "5. Timely and Credible Sources. Problem justification is based on ", "answer": [
                "comprehensive timely, and consistently credible sources.",
                "various, and generally credible sources.",
                "a few timely and credible sources.",
                "insufficient, outdated or dubious sources.",
                "sources that are overly general, outdated, and/or of dubious credibility.",
                "essentially only the opinion of the researcher."],
            "postanswer": ""},
        {"preanswer": "6. Objective Detail. Problem Justification offers ", "answer": [
                "consistently",
                "generally",
                "not necessarily",
                "little",
                "little or no",
                "no"],
            "postanswer": " objective detail."},
        {"preanswer": "7. Determination of Design Requirements. ", "answer": [
                "Multiple",
                "Multiple",
                "At least a few",
                "At least a few but possibly not",
                "No",
                "No"],
            "postanswer": " measurable design requirements can be determined from the objective detail."}
    ]
};

eleB_rubric = {"element": "Element B", "rubric": [
        {"preanswer": "1. Documentation of plausible prior attempts to solve the problem and/or related problems is drawn from ", "answer": [
                "a wide array of clearly identified and consistently credible sources.",
                "a variety of clearly identified and consistently credible sources.",
                "several—but not necessarily varied—clearly identified and generally credible sources.",
                "a limited number of sources, some of which may not be clearly identified and/or credible.",
                "only one or two sources that may not be clearly identified and/or credible.",
                "missing or minimal (a single source that is not clearly identified and/or credible)."], "postanswer": ""},
        {"preanswer": "2. The analysis of past and current attempts to solve the problem — including both strengths and shortcomings — ", "answer": [
                "is consistently clear, detailed, and supported by relevant data.",
                "is clear and is generally detailed and supported by relevant data.",
                "is generally clear and contains some detail and relevant supporting data.",
                "is overly general and contains little detail and/or relevant supporting data.",
                "is vague and is missing any relevant details and/or relevant supporting data.",
                "cannot be inferred from information intended as analysis of past and/or current attempts to solve the problem."], "postanswer": ""}
    ]
};

eleC_rubric = {"element": "Element C", "rubric": [
        {"preanswer": "1. Presentation and justification of solution design requirements ", "answer": [
                "are listed and prioritized and are  clear and detailed.",
                "are listed and prioritized and are generally clear and detailed.",
                "are listed and prioritized and are generally clear and somewhat detailed.",
                "are listed and prioritized but some or all may be incomplete and/or lack specificity.",
                "listing, format and prioritization is attempted but these may be partial and/or overly general.",
                "are not present or are too vague."],
            "postanswer": ""},
        {"preanswer": "2. Objective & Measurable.  Design requirements ", "answer": [
                "are consistently objective and measurable.",
                "are nearly always objective and measurable.",
                "are generally objective and measurable.",
                "may be only sometimes objective and/or measurable.",
                "are insufficiently measurable.",
                "are not measurable."],
            "postanswer": ""},
        {"preanswer": "3. Leading to Solution.  Design requirements ", "answer": [
                "would be highly likely to lead to a tangible and viable problem solution.",
                "would be likely to lead to a tangible and viable problem solution.",
                "have a potential to lead to a tangible and viable problem solution.",
                "do not clearly lead to a tangible and viable problem solution.",
                "cannot lead to a tangible and viable problem solution.",
                "cannot lead to a tangible and viable problem solution."],
            "postanswer": ""},
        {"preanswer": "4. Primary Stakeholder Validation.  There is evidence that requirements represent the needs of, and have been validated by ", "answer": [
                "many if not all primary stakeholder groups.",
                "several primary stakeholder groups.",
                "at least a few primary stakeholder groups.",
                "only one primary stakeholder groups.",
                "no primary stakeholder groups.",
                "no primary stakeholder groups."],
            "postanswer": ""}
    ]
}

eleD_rubric = {"element": "Element D", "rubric": [
        {"preanswer": "1. The process for generating possible solutions ", "answer": [
                "was comprehensive, iterative, and consistently defensible (viable design highly likely).",
                "was thorough, iterative, and generally defensible (viable design likely).",
                "was adequate, generally iterative and defensible (viable design is possible).",
                "was partial or overly general and only somewhat iterative and/or defensible (raising issues with the  design viability).",
                "was incomplete or minimally iterative and/or defensible (raising issues with the  design viability).",
                "was not evident that there was an attempt."],
            "postanswer": ""},
        {"preanswer": "2. The design solution chosen ", "answer": [
                "was well-justified and demonstrated attention to all design requirements.",
                "was justified and demonstrated attention to most if not all design requirements.",
                "was explained with reference to at least some design requirements.",
                "was not sufficiently explained with reference to design requirements.",
                "lacked support related to design requirements.",
                "was not attempted or evidence not provided."],
            "postanswer": ""},
        {"preanswer": "3. The plan of action ", "answer": [
                "has considerable merit and would easily support repetition and testing for effectiveness by others.",
                "would support repetition and testing for effectiveness by others.",
                "might not clearly or fully support repetition and testing for effectiveness by others.",
                "has insufficient detail to allow for testing for replication of results.",
                "is lacking to the point that the design solution cannot be tested.",
                "cannot be executed or does not exist."],
            "postanswer": ""}
    ]
};

eleE_rubric = {"element": "Element E", "rubric": [
        {"preanswer": "1. The proposed solution is ", "answer": [
                "well substantiated with STEM principles and practices.",
                "generally substantiated with STEM principles and practices.",
                "partially substantiated with STEM principles and practices.",
                "minimally substantiated with STEM principles and practices.",
                "minimally substantiated with STEM principles and practices.",
                "not substantiated with STEM principles and practices."],
            "postanswer": ""},
        {"preanswer": "2. The proposed solution is", "answer": [
                "applicable to all or nearly all design requirements and functional claims.",
                "applicable to some design requirements and functional claims.",
                "applicable to at least a few design requirements and functional claims.",
                "applicable to at least a few design requirements and functional claims.",
                "applicable to at least a few design requirements and functional claims.",
                "not applicable to any design requirements and/or functional claims."],
            "postanswer": ""},
        {"preanswer": "3. Evidence that design is reviewed.", "answer": [
                "There is substantial evidence that the application of STEM principles & practices (or suitable alternative) has been reviewed by expert(s).",
                "There is some evidence that the application of STEM principles & practices (or suitable alternative) has been reviewed by expert(s).",
                "There is some evidence that the application of STEM principles & practices (or suitable alternative) has been reviewed by expert(s).",
                "There is minimal evidence that the application of STEM principles & practices (or suitable alternative) has been reviewed by expert(s)",
                "There is no evidence that the application of STEM principles & practices (or suitable alternative) has been reviewed by expert(s).",
                "There is no evidence that the application of STEM principles & practices (or suitable alternative) has been reviewed by expert(s)."],
            "postanswer": ""},
        {"preanswer": "4. Design reviewed by experts", "answer": [
                "Two or more expert(s) have/has reviewed the design for application of STEM principles & practices.",
                "Two or more expert(s) have/has reviewed the design for application of STEM principles & practices.",
                "At least one expert(s) have/has reviewed the design for application of STEM principles & practices.",
                "At least one expert(s) have/has reviewed the design for application of STEM principles & practices.",
                "Only one expert(s) have/has reviewed the design for application of STEM principles & practices.",
                "No expert(s) have/has reviewed the design for application of STEM principles & practices."],
            "postanswer": ""},
        {"preanswer": "5. The design reviews provided", "answer": [
                "confirmation (verification) or detail necessary to inform a corrective response.",
                "confirmation (verification) or detail necessary to inform a corrective response.",
                "may not provide clear confirmation (verification) or at least some detail necessary to inform a corrective response.",
                "show no evidence of confirmation (verification) or any detail to inform a corrective response.",
                "show no evidence of confirmation (verification) by an expert.",
                "show no evidence of confirmation (verification) by an expert."],
            "postanswer": ""}
    ]
};

eleF_rubric = {"element": "Element F", "rubric": [
        {"preanswer": "1. The proposed design was ", "answer": [
                "carefully reviewed based on several relevent",
                "adequately reviewed based on several relevent",
                "partially reviewed based on several relevent",
                "superficially reviewed based on several relevent",
                "superficially reviewed based on marginally relevant",
                "not reviewed (o evidence) based on any"],
            "postanswer": " extra-functional considerations."},
        {"preanswer": "2. A judgement about design viability based on those considerations (the capacity of the proposed solution to address the problem) ", "answer": [
                "is clearly realistic and well supported with credible evidence.",
                "is generally realistic and adequately supported with credible evidence.",
                "is only somewhat/sometimes realistic and is only partially supported with credible evidence.",
                "may be generally although not completely unrealistic and/or may be inadequately supported with credible evidence.",
                "may be unrealistic and/or not supported with credible evidence.",
                "may be unrealistic and/or not supported with credible evidence."],
            "postanswer": ""}
    ]
}

eleG_rubric = {"element": "Element G", "rubric": [
        {"preanswer": "1. The final prototype iteration is ", "answer": [
                "clearly and fully explained.",
                "clearly and adequately explained.",
                "clearly and adequately explained.",
                "only somewhat clearly and/or completely explained.",
                "only minimally explained.",
                "is unclear or is missing altogether."],
            "postanswer": ""},
        {"preanswer": "2. The final prototype iteration is ", "answer": [
                "constructed with enough detail to assure that objective data on all or nearly all design reqmts could be determined.",
                "constructed with enough detail to assure that objective data on many or nearly all design reqmts could be determined.",
                "constructed with enough detail to assure that objective data on some design reqmts could be determined.",
                "not constructed with enough detail to assure that objective data on at least one design reqmts could be determined.",
                "constructed with enough detail to assure that objective data on at least a few design reqmts could be determined.",
                "not applicable to any design requirements and/or functional claims."],
            "postanswer": ""},
        {"preanswer": "3. Testing or Modeling of Attributes. ", "answer": [
                "All",
                "Most",
                "Some",
                "A few",
                "No more than one",
                "None of the"],
            "postanswer": " attributes (sub-systems) of the unique solution that can be tested or modeled mathematically are addressed."},
        {"preanswer": "4. Addressing non-Testable Attributes. ", "answer": [
                "A well supported",
                "A generally supported",
                "An adequately supported",
                "Insufficient",
                "No",
                "No"],
            "postanswer": " justification is provided for those that cannot be tested or modeled mathematically and thus require expert review."}
    ]
};

eleH_rubric = {"element": "Element H", "rubric": [
        {"preanswer": "1. The testing plan addresses ", "answer": [
                "all or nearly all",
                "many",
                "some",
                "a few",
                "one",
                "none"],
            "postanswer": " of the high priority design rqmts."},
        {"preanswer": "2. The testing plan ", "answer": [
                "is effective",
                "is generally effective",
                "is only adequate",
                "is partially effective",
                "is at least minimally effective",
                "is void"],
            "postanswer": " in describing the conduct of tests (through physical and/or mathmatical modeling)."},
        {"preanswer": "3. The testing plan defines ", "answer": [
                "multiple tests that are feasible based on the instructional context.",
                "multiple tests that are feasible based on the instructional context.",
                "multiple tests that are feasible based on the instructional context.",
                "multiple tests that are feasible based on the instructional context.",
                "one test that is feasible based on the instructional context.",
                "one test that is feasible or is missed altogether."],
            "postanswer": ""},
        {"preanswer": "4. The testing plan provides for others a ", "answer": [
                "logical and well developed explanation.",
                "logical and generally developed explanation.",
                "generally logical and adequately developed explanation.",
                "somewhat logical and partially-developed explanation.",
                "at least generally logical and/or partially developed explanation.",
                "at least generally logical and/or partially developed explanation."],
            "postanswer": ""},
        {"preanswer": "5. The testing plan is confirmed by ", "answer": [
                "one or more",
                "one or more",
                "one or more",
                "one or more",
                "no",
                "no"],
            "postanswer": " field experts."}
    ]
};

eleI_rubric = {"element": "Element I", "rubric": [
        {"preanswer": "1. The student conducts ", "answer": [
                "several",
                "several",
                "a few",
                "one or two",
                "one or two",
                "no"],
            "postanswer": " tests for high priority requirements that are reasonable based on instructional contextx, or through physical or mathmatical modeling."},
        {"preanswer": "2. The student conducts tests for ", "answer": [
                "high priority",
                "high priority",
                "high priority",
                "high priority",
                "May or may not be high priority",
                "non-existent"],
            "postanswer": " requirements that are reasonable based on instructional context, or through physical or mathmatical modeling."},
        {"preanswer": "3. The student demonstrates ", "answer": [
                "considerable",
                "ample",
                "adequate",
                "partial or overly general",
                "minimal",
                "failure of"],
            "postanswer": " understanding of testing procedure, including the gathering and analysis of resultant data."},
        {"preanswer": "4. The analysis of the effectiveness with which the design met stated goals includes ", "answer": [
                "a consistently detailed (generously supported by pictures, graphs, charts and other visuals)",
                "a generally detailed (generally supported by pictures, graphs, charts and other visuals)",
                "a somewhat detailed (at least somewhat supported by pictures, graphs, charts and other visuals)",
                "a partial (partially complete and/or partially correct and minimally supported by pictures, graphs, and other visuals)",
                "an attempted (may not be supported by pictures, graphs, charts and other visuals)",
                "no"],
            "postanswer": " explanation (and summary) of the data."},
        {"preanswer": "5. The analysis includes ", "answer": [
                "an overall summary of the implications of all",
                "an overall summary of the implications of most if not all",
                "an overall summary of the implications of at least some",
                "a partial (or overly general) summary of the implications of at least some",
                "no partial (or even overly general) summary of the implications of any",
                "no summary of the implications of any"],
            "postanswer": " of the data for proceeding with the design and solving the problem."}
    ]
};

eleJ_rubric = {"element": "Element J", "rubric": [
        {"preanswer": "1. Documentation of project evaluation is by ", "answer": [
                "multiple, demonstrably qualified stakeholders and field experts is presented.",
                "two or more demonstrably qualified stakeholders and field experts is presented.",
                "three or four demonstrably qualified stakeholders and/or field experts is presented.",
                "two or three representatives of stakeholders and/or field experts (some of whom may not be demonstrably qualified) is presented.",
                "one or two representatives of stakeholders and/or field experts is presented.",
                "any representative stakeholder or field expert is non-existent OR if included is minimal."],
            "postanswer": ""},
        {"preanswer": "2. Project Documentation of project evaluation is synthesized ", "answer": [
                "in a consistently specific, detailed and thorough way.",
                "in a generally specific, detailed and thorough way.",
                "in a somewhat specific and detailed way, but may not be thorough.",
                "in a somewhat specific and/or detailed, but incomplete or overly general way.",
                "in a sparse manner, with few specifics / details.",
                "minimally or is missing."
            ],
            "postanswer": ""},
        {"preanswer": "3. Documentation ", "answer": [
                "is sufficient in two or more",
                "is sufficient in at least one of the",
                "may not be complete in any",
                "is incomplete or overly general in all",
                "is insufficient in all",
                "is non-existent or  minimal in all"],
            "postanswer": " categories to yield a meaningful analysis of the evaluation data."},
        {"preanswer": "4. The synthesis of evaluations ", "answer": [
                "consistently",
                "generally",
                "in part (at least some of)",
                "in part (at least a few of)",
                "mimimally (only one or two of)",
                "minimally (or missing)"],
            "postanswer": " addresses evaluators' specific questions, concerns and opinions related to design requirements."}
    ]
};

eleK_rubric = {"element": "Element K", "rubric": [
        {"preanswer": "1. The project designer provides ", "answer": [
                "a generally clear, insightful and comprehensive reflection",
                "a clear, insightful and comprehensive reflection",
                "a generally clear, insightful and adequately-developed reflection",
                "a generally clear, at least somewhat insightful and partially-developed reflection (or only a portion of the steps)",
                "a generally clear, at least somewhat insightful and partially-developed reflection",
                "an attempted reflection on at least one or two minimal reflection"],
            "postanswer": " on each step of the project."},
        {"preanswer": "2. A value judgement is ", "answer": [
                "consistently (for major steps)",
                "consistently (for major steps)",
                "consistently (for major steps, with one or two addressed in only a cursory manor)",
                "partially (one or two addressed in only a cursory manor)",
                "partially (and overly general or superficial)",
                "partially (minimal, unclear and extremely superficial)"],
            "postanswer": "provided for project steps."},
        {"preanswer": "3. Lessons learned reflections are ", "answer": [
                "substantive and are clearly useful to others attempting the same or similar project.",
                "summarized and are clearly useful to others attempting the same or similar project.",
                "summarized and at least most are useful to others attempting the same or similar project.",
                "included in part and some are useful to others attempting the same or similar project.",
                "minimally included and at least one is useful to others attempting the same or similar project.",
                "unclear and/or unlikely to be useful to others attempting the same or similar project (or there is of evidence of lessons learned)."],
            "postanswer": ""}
    ]
};

eleL_rubric = {"element": "Element L", "rubric": [
        {"preanswer": "1. The project designer includes ", "answer": [
                "consistently detailed and salient recommendations",
                "generally detailed and salient recommendations",
                "few detailed and salient recommendations",
                "recommendations",
                "one or two overly general and/or questionably relevant recommendations",
                "one or two recommendations (with or without plans) which may have little relevance"],
            "postanswer": " regarding the conduct of a same/similar project in the future."},
        {"preanswer": "2. Recommendations include ", "answer": [
                "caveats as warranted and specific ways the project could be improved.",
                "caveats as warranted and specific ways the project could be improved.",
                "some specific ways the project could be improved.",
                "may include some specific ways the project could be improved.",
                "vague recommendations for improvement of the project.",
                "no recommendations for improvement of the project."],
            "postanswer": ""},
        {"preanswer": "3. Plans for implementation of improvements are ", "answer": [
                "consistently detailed.",
                "generally detailed.",
                "minimally detailed and may include one or more caveats.",
                "partially detailed and or overly general.",
                "vague/unclear or minimally related to the recommendations provided.",
                "not offered."],
            "postanswer": ""}
    ]
};


// Array used for convinenet 
RubricArray = [eleA_rubric, eleB_rubric, eleC_rubric, eleD_rubric, eleE_rubric, eleF_rubric, 
    eleG_rubric, eleH_rubric, eleI_rubric, eleJ_rubric, eleK_rubric, eleL_rubric]


//Teacher and students objects with basic properties such as ID, first name, last name, grade, and school
var teacher = {teacher_id: null, fname: null, lname: null, grade: null, school: null};
var student = {student_id: null, fname: null, lname: null, grade: null, school: null};
var project = {project_id: null, }

//Teacher and Student object arrays
teacher_array = [];
student_array = [];
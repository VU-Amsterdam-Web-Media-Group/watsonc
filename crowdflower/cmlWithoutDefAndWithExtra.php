<?php

echo urlencode("<p>In the sentence:&#160;<strong><em>\"</em></strong>
{{sentence}}<strong><em>\"</em></strong></p>
<p>Is<strong>&#160;</strong>
{{term1}}<strong>&#160;</strong>&#160;<em><strong>----</strong>related-to<strong>----&#160;</strong></em>&#160;
{{term2}}?</p>
<p><strong></strong></p>
<cml:checkboxes label=\"STEP 1: Select the valid RELATION(s)\" class=\"\" instructions=\"It is important that you understand what the different relation types mean. HOVER MOUSE over each relation name to see the DEFINITION and an EXAMPLE.\" validates=\"required\" aggregation=\"avg\">
<cml:checkbox label=\"[TREATS]\" value=\"[TREATS]\" title=\"TREATS: Therapeutic use of an ingredient or a drug, e.g. penicillin cures infection, etc.\"/> 
<cml:checkbox label=\"[PREVENTS]\" value=\"[PREVENTS]\" title=\"PREVENTS: Preventative use of an ingredient or a drug, e.g. vitamin C reduces the risk of influenza, etc.\"/> 
<cml:checkbox label=\"[DIAGNOSED_BY_TEST_OR_DRUG]\" value=\"[DIAGNOSE_BY_TEST_OR_DRUG]\" title=\"DIAGNOSE_BY_TEST_OR_DRUG: Diagnostic use of an ingredient, test or a drug, e.g.  RINNE test is used for determining hearing loss, etc.\"/>
<cml:checkbox label=\"[CAUSES]\" value=\"[CAUSES]\" title=\"CAUSES: The underlying reason for a symptom or a disease, e.g. fever induces dizziness etc.\"/>
<cml:checkbox label=\"[LOCATION]\" value=\"[LOCATION]\" title=\"LOCATION: Body part or anatomical structure in which disease or disorder is observed, e.g. leukimia is found in the circulatory system, etc.\"/>
<cml:checkbox label=\"[SYMPTOM]\" value=\"[SYMPTOM]\" title=\"SYMPTOM: Deviation from normal function indicating the presence of disease or abnormality, e.g. pain is a symptom of a broken arm, etc.\"/>
<cml:checkbox label=\"[MANIFESTATION]\" value=\"[MANIFESTATION]\" title=\"MANIFESTATION: Links disorders to the observations (manifestations) that are closely associated with them, e.g. abdominal distension is a manifestation of liver failure.\"/>
<cml:checkbox label=\"[CONTRAINDICATES]\" value=\"[CONTRAINDICATES]\" title=\"CONTRAINDICATES: A condition that indicates that drug or treatment SHOULD NOT BE USED, e.g. patients with obesity should avoid using danazol.\"/>
<cml:checkbox label=\"[ASSOCIATED_WITH]\" value=\"[ASSOCIATED_WITH]\" title=\"ASSOCIATED_WITH: Signs, symptoms or findings that often appear together, e.g. patients who smoke often have yellow teeth.\"/> 
<cml:checkbox label=\"[SIDE_EFFECT]\" value=\"[SIDE_EFFECT]\" title=\"SIDE_EFFECT: A secondary condition or symptom that results from a drug or treatment, e.g. use of antidepressants causes dryness in the eyes.\"/>
<cml:checkbox label=\"[IS_A]\" value=\"[IS_A]\" title=\"IS_A: A relation that indicates that one of the terms is more specific variation of the other, e.g. migraine is a kind of headache.\"/>
<cml:checkbox label=\"[PART_OF]\" value=\"[PART_OF]\" title=\"PART_OF: An anatomical or structural sub-component, e.g. the left ventrical is part of the heart.\"/>
<cml:checkbox label=\"[OTHER]\" value=\"[OTHER]\" title=\"OTHER: The words are related, but not by any of the above relations.\"/>
<cml:checkbox label=\"[NONE]\" value=\"[NONE]\" title=\"NONE: There is no relation between those words in this sentence\"/> 
</cml:checkboxes>

<cml:textarea label=\"STEP 2a: Copy &amp; Paste ONLY the words from the SENTENCE that express the RELATION you selected in STEP1\" class=\"\" instructions=\"Copy &amp; Paste from the sentence ONLY the words that express the RELATION you have selected in STEP1. DO NOT copy the whole sentence.\" validates=\"required\" default=\"Answer N/A if you selected [NONE] in STEP 1. DO NOT copy the whole sentence.\"/>
        <cml:textarea label=\"STEP 2b: If you selected [NONE] in STEP 1, explain why\" class=\"\" instructions=\"If you think there is a relation between those two words, but it is different than any of the relations in STEP 1, then type the relation here.   If you think there is no relation between those terms, explain why do you think it is.\" default=\"Answer N/A if you have selected a relation in STEP 1 other than [NONE].\" validates=\"required\"/>");
?>


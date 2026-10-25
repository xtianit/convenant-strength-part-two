


import logo from "./assets/logo.png";
import Header from "./components/Header";
import { useState, useEffect, useCallback} from "react";
import { createClient } from "@supabase/supabase-js";
import {
    BookOpen,
    Award,
    X,
    Sparkles,
    Shield,
    Compass,
    Volume2,
    VolumeX,
    Trophy,
    Star,
    Zap,
    CheckSquare,
    Flame,
    Send,
    Cpu,
    Loader2
} from "lucide-react";

// Initialize Supabase Client internally to maintain Vite HMR Fast Refresh
const SUPABASE_URL = "https://oypggoucddfkoabkgfql.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mY3mE66Qnkuuq2xSeVm_OQ_QTvzLN1W";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type BibleVersion = "KJV" | "NKJV" | "NIV" | "ESV" | "AMP" | "NLT";
export type BibleVersions = Record<BibleVersion, string>;
export type ScriptureDB = Record<string, BibleVersions>;

export interface LeaderboardEntry {
    user_name: string;
    score: number;
}

export interface QuizQuestion {
    q: string;
    a: string[];
    correct: number;
}

const initialScriptureDB: ScriptureDB = {
    
    "2 Corinthians 6:14": {
        KJV: "14 Be ye not unequally yoked together with unbelievers: for what fellowship hath righteousness with unrighteousness? and what communion hath light with darkness?",
        NKJV: "14 Do not be unequally yoked together with unbelievers. For what fellowship has righteousness with lawlessness? And what communion has light with darkness?",
        NIV: "14 Do not be yoked together with unbelievers. For what do righteousness and wickedness have in common? Or what fellowship can light have with darkness?",
        ESV: "14 Do not be unequally yoked with unbelievers. For what partnership has righteousness with lawlessness? Or what fellowship has light with darkness?",
        AMP: "14 Do not be unequally yoked with unbelievers [do not make misaligned alliances with them or come under a different spirit, which is inconsistent with your faith]. For what partnership have righteousness and lawlessness [or how can right conduct and lawlessness be partners]? Or what fellowship has light with darkness?",
        NLT: "14 Don’t team up with those who are unbelievers. How can righteousness be a partner with wickedness? How can light live with darkness?"
    },
    "Ephesians 5:15": {
        KJV: "15 See then that ye walk circumspectly, not as fools, but as wise,",
        NKJV: "15 See then that you walk circumspectly, not as fools but as wise,",
        NIV: "15 Be very careful, then, how you live—not as unwise but as wise,",
        ESV: "15 Look carefully then how you walk, not as unwise but as wise,",
        AMP: "15 Therefore see that you walk carefully [living life with honor, purpose, and gratitude; not as men who are unwise, but as wise sensible minds],",
        NLT: "15 So be careful how you live. Don’t live like fools, but like those who are wise."
    },
    "Joshua 9:14": {
        KJV: "14 And the men took of their victuals, and asked not counsel at the mouth of the Lord.",
        NKJV: "14 Then the men of Israel took some of their provisions; but they did not ask counsel of the Lord.",
        NIV: "14 The Israelites sampled their provisions but did not inquire of the Lord.",
        ESV: "14 So the men took some of their provisions, but did not ask counsel from the Lord.",
        AMP: "14 So the men [of Israel] took some of their own provisions [and offered them in friendship], and did not ask for the counsel of the Lord.",
        NLT: "14 So the Israelites examined their food, but they did not consult the Lord."
    },
    "Joshua 9:14-19": {
        KJV: "14 And the men took of their victuals, and asked not counsel at the mouth of the Lord. 15 And Joshua made peace with them, and made a league with them, to let them live: and the princes of the congregation sware unto them. 16 And it came to pass at the end of three days after they had made a league with them, that they heard that they were their neighbours, and that they dwelt among them. 17 And the children of Israel journeyed, and came unto their cities on the third day. Now their cities were Gibeon, and Chephirah, and Beeroth, and Kirjathjearim. 18 And the children of Israel smote them not, because the princes of the congregation had sworn unto them by the Lord God of Israel. And all the congregation murmured against the princes. 19 But all the princes said unto all the congregation, We have sworn unto them by the Lord God of Israel: now therefore we may not touch them.",
        NKJV: "14 Then the men of Israel took some of their provisions; but they did not ask counsel of the Lord. 15 So Joshua made peace with them, and made a covenant with them to let them live; and the rulers of the congregations wore to them. 16 And it happened at the end of three days, after they had made a covenant with them, that they heard that they were their neighbors who dwelt near them. 17 Then the children of Israel journeyed and came to their cities on the third day. Now their cities were Gibeon, Chephirah, Beeroth, and Kirjath Jearim. 18 But the children of Israel did not attack them, because the rulers of the congregation had sworn to them by the Lord God of Israel. And all the congregation complained against the rulers. 19 Then all the rulers said to all the congregation, 'We have sworn to them by the Lord God of Israel; now therefore, we may not touch them.'",
        NIV: "14 The Israelites sampled their provisions but did not inquire of the Lord. 15 Then Joshua made a treaty of peace with them to let them live, and the leaders of the assembly ratified it by oath. 16 Three days after they made the treaty with the Gibeonites, the Israelites heard that they were neighbors, living near them. 17 So the Israelites set out and on the third day came to their cities: Gibeon, Kephirah, Beeroth and Kiriath Jearim. 18 But the Israelites did not attack them, because the leaders of the assembly had sworn an oath to them by the Lord, the God of Israel. The whole assembly grumbled against the leaders. 19 But all the leaders answered, 'We have given them our oath by the Lord, the God of Israel, and we cannot touch them now.'",
        ESV: "14 So the men took some of their provisions, but did not ask counsel from the Lord. 15 And Joshua made peace with them and made a covenant with them, to let them live, and the leaders of the congregation swore to them. 16 But at the end of three days after they had made a covenant with them, they heard that they were their neighbors and that they lived among them. 17 And the people of Israel set out and reached their cities on the third day. Now their cities were Gibeon, Chephirah, Beeroth, and Kiriath-jearim. 18 But the people of Israel did not attack them, because the leaders of the congregation had sworn to them by the Lord, the God of Israel. Then all the congregation murmured against the leaders. 19 But all the leaders said to all the congregation, 'We have sworn to them by the Lord, the God of Israel, and now we may not touch them.'",
        AMP: "14 So the men [of Israel] took some of their own provisions [and offered them in friendship], and did not ask for the counsel of the Lord. 15 Joshua made peace with them and made a covenant with them, to let them live, and the leaders of the congregation swore an oath to them. 16 It happened that after they had made a covenant with them, they heard that they were actually their neighbors and lived among them. 17 Then the sons of Israel set out and came to their cities on the third day. Now their cities were Gibeon, Chephirah, Beeroth, and Kiriath-jearim. 18 The sons of Israel did not kill them because the leaders of the congregation had sworn an oath to them by the Lord, the God of Israel. And all the congregation murmured against the leaders. 19 But all the leaders said to all the congregation, 'We have sworn an oath to them by the Lord, the God of Israel, and now we cannot touch them.'",
        NLT: "14 So the Israelites examined their food, but they did not consult the Lord. 15 Then Joshua made a peace treaty with them and guaranteed their safety, and the leaders of the community ratified their agreement with a binding oath. 16 Three days after making the treaty, they learned that these people actually lived nearby! 17 The Israelites set out at once to investigate and reached their towns in three days. The towns were Gibeon, Kephirah, Beeroth, and Kiriath-jearim. 18 But the Israelites did not attack the towns, for the Israelite leaders had made a vow to them in the name of the Lord, the God of Israel. The people of Israel grumbled against the leaders because of the treaty. 19 But the leaders replied, 'Since we have sworn an oath in the presence of the Lord, the God of Israel, we cannot touch them.'"
    },
    "2 Samuel 21:1-9": {
        KJV: "1 Then there was a famine in the days of David three years, year after year; and David enquired of the Lord. And the Lord answered, It is for Saul, and for his bloody house, because he slew the Gibeonites. 2 And the king called the Gibeonites, and said unto them; (now the Gibeonites were not of the children of Israel, but of the remnant of the Amorites; and the children of Israel had sworn unto them: and Saul sought to slay them in his zeal to the children of Israel and Judah.) 3 Wherefore David said unto the Gibeonites, What shall I do for you? and wherewith shall I make the atonement, that ye may bless the inheritance of the Lord? 4 And the Gibeonites said unto him, We will have no silver nor gold of Saul, nor of his house; neither for us shalt thou kill any man in Israel. And he said, What ye shall say, that will I do for you. 5 And they answered the king, The man that consumed us, and that devised against us that we should be destroyed from remaining in any of the coasts of Israel, 6 Let seven men of his sons be delivered unto us, and we will hang them up unto the Lord in Gibeah of Saul, whom the Lord did choose. And the king said, I will give them. 7 But the king spared Mephibosheth, the son of Jonathan the son of Saul, because of the Lord's oath that was between them, between David and Jonathan the son of Saul. 8 But the king took the two sons of Rizpah the daughter of Aiah, whom she bare unto Saul, Armoni and Mephibosheth; and the five sons of Michal the daughter of Saul, whom she brought up for Adriel the son of Barzillai the Meholathite: 9 And he delivered them into the hands of the Gibeonites, and they hanged them in the hill before the Lord: and they fell all seven together, and were put to death in the days of harvest, in the first days, in the beginning of barley harvest.",
        NKJV: "1 Now there was a famine in the days of David for three years, year after year; and David inquired of the Lord. And the Lord answered, 'It is because of Saul and his bloodthirsty house, because he killed the Gibeonites.' 2 So the king called the Gibeonites and spoke to them. (Now the Gibeonites were not of the children of Israel, but of the remnant of the Amorites; the children of Israel had sworn protection to them, but Saul had sought to kill them in his zeal for the children of Israel and Judah.) 3 Therefore David said to the Gibeonites, 'What shall I do for you? And with what shall I make atonement, that you may bless the inheritance of the Lord?' 4 And the Gibeonites said to him, 'We will have no silver or gold from Saul or from his house, nor shall you kill any man in Israel for us.' So he said, 'Whatever you say, I will do for you.' 5 Then they answered the king, 'As for the man who consumed us and plotted against us, that we should be destroyed from remaining in any of the territories of Israel, 6 let seven men of his descendants be delivered to us, and we will hang them before the Lord in Gibeah of Saul, whom the Lord chose.' And the king said, 'I will give them.' 7 But the king spared Mephibosheth the son of Jonathan, the son of Saul, because of the Lord’s oath that was between them, between David and Jonathan the son of Saul. 8 So the king took Armoni and Mephibosheth, the two sons of Rizpah the daughter of Aiah, whom she bore to Saul, and the five sons of Michal the daughter of Saul, whom she brought up for Adriel the son of Barzillai the Meholathite; 9 and he delivered them into the hands of the Gibeonites, and they hanged them on the hill before the Lord. So they fell, all seven together, and were put to death in the days of harvest, in the first days, in the beginning of barley harvest.",
        NIV: "1 During the reign of David, there was a famine for three successive years; so David sought the face of the Lord. The Lord said, 'It is on account of Saul and his blood-stained house; it is because he put the Gibeonites to death.' 2 The king summoned the Gibeonites and spoke to them. (Now the Gibeonites were not Israelites, but a remnant of the Amorites; the Israelites had sworn to spare them, but Saul in his zeal for Israel and Judah had tried to annihilate them.) 3 David asked the Gibeonites, 'What shall I do for you? How shall I make atonement so that you will bless the Lord’s inheritance?' 4 The Gibeonites answered him, 'We have no right to demand silver or gold from Saul or his family, nor do we have the right to put anyone in Israel to death.' 'What do you want me to do for you?' David asked. 5 They answered the king, 'As for the man who destroyed us and plotted against us so that we have been decimated and have no place anywhere in Israel, 6 let seven of his male descendants be given to us to be killed and exposed before the Lord at Gibeah of Saul—the Lord’s chosen one.' So the king said, 'I will give them.' 7 The king spared Mephibosheth son of Jonathan, the son of Saul, because of the oath before the Lord between David and Jonathan son of Saul. 8 But the king took Armoni and Mephibosheth, the two sons of Rizpah daughter of Aiah, whom she had borne to Saul, together with the five sons of Saul’s daughter Merab, whom she had borne to Adriel son of Barzillai the Meholathite. 9 He handed them over to the Gibeonites, who killed them and exposed them on a hill before the Lord. All seven of them fell together; they were put to death during the first days of the harvest, just as the barley harvest was beginning.",
        ESV: "1 Now there was a famine in the days of David for three years, year after year. And David sought the face of the Lord. And the Lord said, 'There is bloodguilt on Saul and on his house, because he put the Gibeonites to death.' 2 So the king called the Gibeonites and spoke to them. Now the Gibeonites were not of the people of Israel but of the remnant of the Amorites. Although the people of Israel had sworn to spare them, Saul had sought to strike them down in his zeal for the people of Israel and Judah. 3 And David said to the Gibeonites, 'What shall I do for you? And how shall I make atonement, that you may bless the heritage of the Lord?' 4 The Gibeonites said to him, 'It is not a matter of silver or gold between us and Saul or his house; neither is it for us to put any man to death in Israel.' And he said, 'What do you say that I shall do for you?' 5 They said to the king, 'The man who consumed us and planned to destroy us, so that we should have no place in all the territory of Israel, 6 let seven of his sons be given to us, so that we may hang them before the Lord at Gibeah of Saul, the chosen of the Lord.' And the king said, 'I will give them.' 7 But the king spared Mephibosheth the son of Jonathan, Saul's son, because of the oath of the Lord that was between them, between David and Jonathan the son of Saul. 8 The king took the two sons of Rizpah the daughter of Aiah, whom she bore to Saul, Armoni and Mephibosheth; and the five sons of Merab the daughter of Saul, whom she bore to Adriel the son of Barzillai the Meholathite; 9 and he gave them into the hands of the Gibeonites, and they hanged them on the mountain before the Lord, and the seven of them perished together. They were put to death in the first days of harvest, at the beginning of barley harvest.",
        AMP: "1 Now there was a famine in the days of David for three years, year after year; and David sought the face of the Lord [and asked the reason for it]. The Lord answered, 'It is because of Saul and his bloody house, because he put the Gibeonites to death.' 2 So the king called the Gibeonites and spoke to them (now the Gibeonites were not of the sons of Israel but of the remnant of the Amorites, and the sons of Israel had sworn [an oath] to spare them, but Saul in his zeal for the sons of Israel and Judah had sought to strike them down). 3 So David said to the Gibeonites, 'What shall I do for you? And with what shall I make atonement so that you will bless the inheritance of the Lord?' 4 The Gibeonites said to him, 'It is not a matter of silver or gold between us and Saul or his house, nor is it for us to put any man to death in Israel.' David said, 'I will do for you whatever you say.' 5 So they said to the king, 'The man who consumed us and planned to destroy us, so that we should have no place in all the territory of Israel, 6 let seven men from his sons be given to us and we will hang them before the Lord in Gibeah of Saul, the chosen one of the Lord.' And the king said, 'I will give them.' 7 But the king spared Mephibosheth the son of Jonathan, the son of Saul, because of the Lord’s oath that was between them, between David and Jonathan the son of Saul. 8 So the king took the two sons of Rizpah the daughter of Aiah, whom she bore to Saul, Armoni and Mephibosheth, and the five sons of Merab the daughter of Saul, whom she bore to Adriel the son of Barzillai the Meholathite. 9 He handed them over to the Gibeonites, and they hanged them on the mountain before the Lord; the seven of them died together. They were put to death in the first days of harvest, at the beginning of the barley harvest.",
        NLT: "1 There was a famine during David’s reign that lasted for three years, so David asked the Lord about it. And the Lord said, 'The famine has come because Saul and his family are guilty of murdering the Gibeonites.' 2 So the king summoned the Gibeonites. They were not part of the Israelite nation but were survivors of the Amorites; the Israelites had promised to spare them, but Saul, in his zeal for Israel and Judah, had tried to destroy them. 3 David asked them, 'What can I do for you? How can I make amends so that you will again pronounce a blessing on the Lord’s inheritance?' 4 'Well, money can’t settle this matter between us and the family of Saul,' the Gibeonites replied. 'Neither can we demand the life of anyone in Israel.' 'What can I do then?' David asked. 'Just tell me and I will do it for you.' 5 Then they replied, 'It was Saul who planned to destroy us, to keep us from having any place at all in the territory of Israel. 6 So let seven of his sons be handed over to us, and we will execute them before the Lord at Gibeah, the hometown of Saul, the Lord’s chosen king.' 'All right,' the king said, 'I will do it.' 7 The king spared Jonathan’s son Mephibosheth, who was Saul’s grandson, because of the oath David and Jonathan had sworn before the Lord. 8 But he gave them Armoni and Mephibosheth, the two sons of Saul and Rizpah daughter of Aiah. He also gave them the five sons of Saul’s daughter Merab, the wife of Adriel son of Barzillai from Meholah. 9 The king gave them to the Gibeonites, who executed them on the mountain before the Lord. So all seven of them died together at the beginning of the barley harvest."
    },
    "Exodus 23:32-34": {
        KJV: "32 Thou shalt make no covenant with them, nor with their gods. 33 They shall not dwell in thy land, lest they make thee sin against me: for if thou serve their gods, it will surely be a snare unto thee.",
        NKJV: "32 You shall make no covenant with them, nor with their gods. 33 They shall not dwell in your land, lest they make you sin against Me. For if you serve their gods, it will surely be a snare to you.",
        NIV: "32 Do not make a covenant with them or with their gods. 33 Do not let them live in your land or they will cause you to sin against me, because the worship of their gods will certainly be a snare to you.",
        ESV: "32 You shall make no covenant with them and their gods. 33 They shall not dwell in your land, lest they make you sin against me; for if you serve their gods, it will surely be a snare to you.",
        AMP: "32 You shall make no covenant with them nor with their gods. 33 They shall not live in your land, because they will make you sin against Me; for if you serve their gods, it will surely be a snare to you [leading to eternal death].",
        NLT: "32 Make no treaty with them or their gods. 33 They must not live in your land, or they will cause you to sin against me. If you serve their gods, you will be caught in the trap of idolatry."
    },
    "Exodus 23:32": {
        KJV: "32 Thou shalt make no covenant with them, nor with their gods.",
        NKJV: "32 You shall make no covenant with them, nor with their gods.",
        NIV: "32 Do not make a covenant with them or with their gods.",
        ESV: "32 You shall make no covenant with them and their gods.",
        AMP: "32 You shall make no covenant with them nor with their gods.",
        NLT: "32 Make no treaty with them or their gods."
    },
    "Exodus 34:12-17": {
        KJV: "12 Take heed to thyself, lest thou make a covenant with the inhabitants of the land whither thou goest, lest it be for a snare in the midst of thee: 13 But ye shall destroy their altars, break their images, and cut down their groves: 14 For thou shalt worship no other god: for the Lord, whose name is Jealous, is a jealous God: 15 Lest thou make a covenant with the inhabitants of the land, and they go a whoring after their gods, and do sacrifice unto their gods, and one call thee, and thou eat of his sacrifice; 16 And thou take of their daughters unto thy sons, and their daughters go a whoring after their gods, and make thy sons go a whoring after their gods. 17 Thou shalt make thee no molten gods.",
        NKJV: "12 Take heed to yourself, lest you make a covenant with the inhabitants of the land where you are going, lest it be a snare in your midst. 13 But you shall destroy their altars, break their sacred pillars, and cut down their wooden images 14 (for you shall worship no other god, for the Lord, whose name is Jealous, is a jealous God), 15 lest you make a covenant with the inhabitants of the land, and they play the harlot with their gods and make sacrifice to their gods, and one of them invites you and you eat of his sacrifice, 16 and you take of their daughters for your sons, and their daughters play the harlot with their gods and make your sons play the harlot with their gods. 17 You shall make no molded gods for yourselves.",
        NIV: "12 Be careful not to make a treaty with those who live in the land where you are going, or they will be a snare among you. 13 Break down their altars, smash their sacred stones and cut down their Asherah poles. 14 Do not worship any other god, for the Lord, whose name is Jealous, is a jealous God. 15 Be careful not to make a treaty with those who live in the land; for when they prostitute themselves to their gods and sacrifice to them, they will invite you and you will eat their sacrifices. 16 And when you choose some of their daughters as wives for your sons and those daughters prostitute themselves to their gods, they will lead your sons to do the same. 17 Do not make any idols.",
        ESV: "12 Take care, lest you make a covenant with the inhabitants of the land to which you go, lest it become a snare in your midst. 13 You shall tear down their altars and break their pillars and cut down their Asherim 14 (for you shall worship no other god, for the Lord, whose name is Jealous, is a jealous God), 15 lest you make a covenant with the inhabitants of the land, and when they whore after their gods and sacrifice to their gods and you are invited, you eat of his sacrifice, 16 and you take of their daughters for your sons, and their daughters whore after their gods and make your sons whore after their gods. 17 You shall not make for yourself any gods of cast metal.",
        AMP: "12 Watch yourself, lest you make a covenant with the inhabitants of the land into which you are going, lest it become a snare in your midst. 13 But you shall tear down their altars, smash their [pagan] pillars, and cut down their Asherim (symbols of the goddess Asherah) 14 —for you shall not worship any other god; for the Lord, whose name is Jealous, is a jealous (impassioned) God [demanding what is His and its rightful due]— 15 lest you make a covenant with the inhabitants of the land and they play the prostitute with their gods and sacrifice to their gods, and someone invites you to eat his sacrifice, 16 and you take some of their daughters for your sons, and their daughters play the prostitute with their gods and make your sons play the prostitute with their gods. 17 You shall not make for yourselves any gods of cast metal.",
        NLT: "12 Be very careful never to make a treaty with the people who live in the land where you are going. If you do, you will follow their evil ways and be trapped. 13 Instead, you must break down their pagan altars, smash their sacred pillars, and cut down their Asherah poles. 14 You must worship no other gods, for the Lord, whose very name is Jealous, is a God who is jealous about his relationship with you. 15 Do not make a treaty of any kind with the people living in the land. They lust after their gods by offering sacrifices to them. They will invite you to join them in their sacrificial meals, and you will go with them. 16 Then you will accept their daughters, who sacrifice to other gods, as wives for your sons. And they will seduce your sons to commit adultery against me by worshiping other gods. 17 You must never make any gods of cast metal."
    },
    "Deuteronomy 7:2-3": {
        KJV: "2 And when the Lord thy God shall deliver them before thee; thou shalt smite them, and utterly destroy them; thou shalt make no covenant with them, nor shew mercy unto them: 3 Neither shalt thou make marriages with them; thy daughter thou shalt not give unto his son, nor his daughter shalt thou take unto thy son.",
        NKJV: "2 and when the Lord your God delivers them over to you, you shall conquer them and utterly destroy them. You shall make no covenant with them nor show mercy to them. 3 Nor shall you make marriages with them. You shall not give your daughter to their son, nor take their daughter for your son.",
        NIV: "2 and when the Lord your God has delivered them over to you and you have defeated them, then you must destroy them totally. Make no treaty with them, and show them no mercy. 3 Do not intermarry with them. Do not give your daughters to their sons or take their daughters for your sons,",
        ESV: "2 and when the Lord your God gives them over to you, and you defeat them, then you must devote them to complete destruction. You shall make no covenant with them and show no mercy to them. 3 You shall not intermarry with them, giving your daughters to their sons or taking their daughters for your sons,",
        AMP: "2 and when the Lord your God hands them over to you and you defeat them, then you must utterly destroy them. You shall not make a covenant with them nor show mercy to them. 3 You shall not intermarry with them; you shall not give your daughter to his son, nor shall you take his daughter for your son.",
        NLT: "2 When the Lord your God hands them over to you and you conquer them, you must completely destroy them. Make no treaty with them and show them no mercy. 3 You must not intermarry with them. Do not let your daughters marry their sons! And do not let your sons marry their daughters,"
    },
    
    "Joshua 10:6-7": {
        KJV: "6 And the men of Gibeon sent unto Joshua to the camp to Gilgal, saying, Slack not thy hand from thy servants; come up to us quickly, and save us, and help us: for all the kings of the Amorites that dwell in the mountains are gathered together against us. 7 So Joshua ascended from Gilgal, he, and all the people of war with him, and all the mighty men of valour.",
        NKJV: "6 And the men of Gibeon sent to Joshua at the camp at Gilgal, saying, 'Do not forsake your servants; come up to us quickly, save us and help us, for all the kings of the Amorites who dwell in the mountains have gathered together against us.' 7 So Joshua ascended from Gilgal, he and all the people of war with him, and all the mighty men of valor.",
        NIV: "6 The Gibeonites then sent word to Joshua in the camp at Gilgal: 'Do not abandon your servants. Come up to us quickly and save us! Help us, because all the Amorite kings from the hill country have joined forces against us.' 7 So Joshua marched up from Gilgal with his entire army, including all the best fighting men.",
        ESV: "6 And the men of Gibeon sent to Joshua at the camp in Gilgal, saying, 'Do not relax your hand from your servants. Come up to us quickly and save us and help us, for all the kings of the Amorites who dwell in the hill country are gathered against us.' 7 So Joshua went up from Gilgal, he and all the people of war with him, and all the mighty men of valor.",
        AMP: "6 So the men of Gibeon sent word to Joshua at the camp in Gilgal, saying, 'Do not abandon your servants; come up to us quickly and save us and help us, for all the [five] kings of the Amorites who live in the hill country have assembled against us.' 7 So Joshua went up from Gilgal, he and all the people of war with him and all the brave men of valor.",
        NLT: "6 The men of Gibeon quickly sent messengers to Joshua at his camp in Gilgal. 'Don’t abandon your servants now!' they pleaded. 'Come at once! Save us! Help us! For all the Amorite kings who live in the hill country have joined forces against us.' 7 So Joshua and his entire army, including his finest warriors, left Gilgal and set out for Gibeon."
    }
};

const quizQuestions: QuizQuestion[] = [
    {
        q: "If a covenant carries spiritual weight and is witnessed by God, how might this affect the way people approach agreements in life?",
        a: [
            "They would take covenants more seriously, knowing God oversees them",
            "They would ignore spiritual implications and focus only on personal gain",
            "They would only worry about legal consequences",
            "They would depend on luck rather than discernment"
        ],
        correct: 0
    },
    {
        q: "Considering the Gibeonites’ strategy, what can be inferred about human decision-making when appearances are trusted without verification?",
        a: [
            "Decisions can be misguided if one fails to investigate thoroughly",
            "Trusting appearances always leads to blessings",
            "All agreements are equally safe to accept",
            "God approves all human decisions regardless of caution"
        ],
        correct: 0
    },
    {
        q: "In 2 Samuel 21:1-9, what triggered the three-year famine during King David's reign?",
        a: [
            "Saul breaking Israel's ancient covenant with the Gibeonites",
            "Israel failing to offer their yearly tithes",
            "A natural drought across the Mediterranean region",
            "David's refusal to build the temple"
        ],
        correct: 0
    },
    {
        q: "What physical sign or token was given in Genesis 9:13-17 to represent God's covenant with Noah and every living creature?",
        a: [
            "The rainbow in the clouds",
            "A memorial stone pillar",
            "An altar of unhewn stones",
            "A golden tablet"
        ],
        correct: 0
    },
    {
        q: "What key lesson does the Gibeonite treaty present regarding the consequences of breaking covenants?",
        a: [
            "Covenants remain binding over time, and breaking them can bring severe default judgments",
            "Old covenants naturally expire after one generation",
            "God forgets ungodly treaties automatically over time",
            "Covenants only matter if both original parties are still alive"
        ],
        correct: 0
    }
];

const SundaySchoolApp = () => {
    const [showPaymentGate, setShowPaymentGate] = useState(true);
    const [, setIsPaid] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");
    const [darkMode, setDarkMode] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [appLoading, setAppLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [tabTransitioning, setTabTransitioning] = useState(false);
    const [scriptureDB] = useState<ScriptureDB>(initialScriptureDB);
    const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
    const [bibleVersion, setBibleVersion] = useState<BibleVersion>("KJV");
    const [showVerseModal, setShowVerseModal] = useState(false);
    const [verseLoading, setVerseLoading] = useState(false);

    // Quiz State
    const [quizActive, setQuizActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(50);
    const [showResults, setShowResults] = useState(false);

    // Verse Card Modal State
    const [showCardModal, setShowCardModal] = useState(false);
    const [cardVerseRef] = useState("Exodus 2:24");
    const [cardTheme, setCardTheme] = useState("from-blue-600 via-indigo-600 to-purple-600");

    // AI Companion State
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiQuery, setAiQuery] = useState("");
    const [aiChatLog, setAiChatLog] = useState<{ sender: string; text: string }[]>([
        { sender: "ai", text: "Blessings! I am your AI Covenant Tutor. Ask me any question about today's Part 2 lesson, 2 Samuel 21, types of covenants, or spiritual implications!" }
    ]);
    const [aiLoading, setAiLoading] = useState(false);

    // Gamification State
    const [userXp, setUserXp] = useState<number>(() => {
        try {
            const saved = localStorage.getItem("sunday_school_xp");
            return saved ? parseInt(saved, 10) : 320;
        } catch {
            return 320;
        }
    });
    const [confettiActive, setConfettiActive] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);

    // Attendance State
    const [isCheckedIn, setIsCheckedIn] = useState(() => {
        return localStorage.getItem("sunday_school_checked_in") === "true";
    });
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);

    // Audio Voice Selector State
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<string>("");
    const [isSpeaking, setIsSpeaking] = useState(false);

    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [userName, setUserName] = useState(() => "User_" + Math.floor(Math.random() * 1000));

    const [contentData] = useState<any>({
        lessonDate: "November 1, 2026",
        lessonTitle: "The Strength of Covenant – Part 3",
    
        memoryVerse:
            "Be ye not unequally yoked together with unbelievers: for what fellowship hath righteousness with unrighteousness? And what communion hath light with darkness?",
        memoryVerseRef: "2 Corinthians 6:14",
    
        introScriptures: ["Ephesians 5:15"], 
        lessonIntroScriptures: [],
    
        introduction:
            "Man is a very powerful being to reckon with of all the creatures of God but his attitude of hasty conclusion on matters has been his problem. Most times he acts before reasoning and gets undesired results. The enemy took advantage of this at EDEN on man and is yet using it today to outwit man. People are often more concerned with the benefits of Covenants without considering the conditions which they possibly may not be able to keep. In Eph 5:15 God strongly request us to be more cautious in order to avoid dangers.",
    
        aims:
            "To reveal the implications of covenants since man is surrounded or obliged to surround himself by it.",
    
        objectives: "To cause man to be mindful of holy covenants and discard evil covenant through Christ.",
    
        lessonIntro:
            "In our previous lesson we looked at the sides of a covenant but today we will consider a wide spectrum of lesson drawn from this subject.",
    
        lessonPoints: [
            {
                title: "The Need for Counsel – verse 14",
                content:
                    "A Covenant is not anything that should be initiated without proper counsel. You need to know the advantages, disadvantages and demands to see if you will be able to meet up before entering into it. Israel like many of us failed because they didn’t seek God’s counsel. Please make a thorough investigation before commitment.",
                refs: ["Joshua 9:14"],
                subPoints: [],
            },
            {
                title: "Covenant With Unbelievers – verse 15",
                content:
                    "God has commanded us not to covenant ourselves with unbelievers because it will always usher in ugly situations. see Exo 23:32, 34:12-17, Deut 7:2-3, 2 Cor 6:14.  Covenant transfer belongings including the partner’s mess and his gods in the case of unbelievers. That is why marriage to an unbeliever is dangerous. Israel was ensnared by their covenant to Gibeon.",
                refs: ["Exodus 23:32","Exodus 34:12-17", "Deuteronomy 7:2-3", "2 Corinthians 6:14"],
                subPoints: [],
            },
            {
                title: "Time Walls",
                content:
                    "Only time separated the Jews from the truth about their deceptive visitors. If they had been a little more cautious and patient and allow time to elapse, they would have escaped the trap. Deceivers have no time to waste and are always in a hurry. Impatient folks are therefore always the victims of their abattoir for slaughter.",
                refs: [],
                subPoints: [],
            },
        ],
    
        conclusion:
            "Let us spare God the stress by escaping the dangers we could avoid.",
    
        conclusionScriptures: [],
    
        prayerPoints: [
            "Heavenly Father, teach me to seek Your counsel before entering into any covenant.",
            "Lord, help me avoid covenants with unbelievers and remain in Your protection.",
            "Father, give me patience and discernment to see through deception and not act hastily.",
            "Lord Jesus, guide me in keeping holy covenants and avoiding evil ones.",
            "Holy Spirit, empower me to walk in integrity and wisdom in all covenantal matters.",
        ],
    });
    

    const addXp = useCallback((amount: number) => {
        setUserXp((prevXp) => {
            const updated = prevXp + amount;
            localStorage.setItem("sunday_school_xp", updated.toString());
            return updated;
        });
    }, []);

    // Speech synthesis Voice Loader
    useEffect(() => {
        let isMounted = true;
        const loadVoices = () => {
            if (!window.speechSynthesis) return;
            const availableVoices = window.speechSynthesis.getVoices();
            if (isMounted) {
                setVoices(availableVoices);
                if (availableVoices.length > 0 && !selectedVoice) {
                    setSelectedVoice(availableVoices[0].name);
                }
            }
        };

        loadVoices();
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            isMounted = false;
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, [selectedVoice]);

    // Fetch Leaderboard
    useEffect(() => {
        let isMounted = true;
        const fetchLeaderboard = async () => {
            const { data, error } = await supabase
                .from("leaderboard")
                .select("*")
                .order("score", { ascending: false })
                .limit(10);
            if (isMounted && data && !error) {
                setLeaderboard(data);
            }
        };
        fetchLeaderboard();
        return () => { isMounted = false; };
    }, []);

    const handleCheckIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const checkData = {
            user_name: userName,
            class_name: contentData.lessonTitle,
        };

        const { error } = await supabase.from("attendance").insert([checkData]);
        setIsCheckedIn(true);
        localStorage.setItem("sunday_school_checked_in", "true");
        addXp(30);
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 2500);
        setShowAttendanceModal(false);

        if (!error) {
            alert("✅ Attendance logged successfully! +30 Spiritual XP earned!");
        } else {
            alert("✅ Attendance marked locally! +30 Spiritual XP earned!");
        }
    };

    const toggleSpeech = useCallback((text: string) => {
        if (!window.speechSynthesis) return;
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(text);
            const chosenVoice = voices.find((v) => v.name === selectedVoice);
            if (chosenVoice) utterance.voice = chosenVoice;
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            addXp(10);
        }
    }, [isSpeaking, voices, selectedVoice, addXp]);

    const formatScriptureText = useCallback((text: string) => {
        const parts = text.split(/(\d+)/);
        return parts.map((part, index) => {
            if (/^\d+$/.test(part)) {
                return <strong key={index} className={`font-bold ${darkMode ? "text-amber-400" : "text-amber-600"}`}>{part}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    }, [darkMode]);

    // App Loading Progress Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setAppLoading(false), 300);
                    return 100;
                }
                return prev + 20;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = useCallback(() => setDarkMode((prev) => !prev), []);
    const adjustFontSize = useCallback((delta: number) => setFontSize((prev) => Math.min(Math.max(prev + delta, 12), 28)), []);

    const handleTabChange = useCallback((tab: string) => {
        if (isSpeaking && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
        setTabTransitioning(true);
        setActiveTab(tab);
        setTimeout(() => setTabTransitioning(false), 250);
    }, [isSpeaking]);

    const showBibleVersions = useCallback((reference: string) => {
        setSelectedVerse(reference);
        setShowVerseModal(true);
        setVerseLoading(true);
        setTimeout(() => setVerseLoading(false), 250);
    }, []);

    const changeBibleVersion = useCallback((version: BibleVersion) => {
        setVerseLoading(true);
        setTimeout(() => {
            setBibleVersion(version);
            setVerseLoading(false);
        }, 150);
    }, []);

    const endQuiz = useCallback(async () => {
        setQuizActive(false);
        setShowResults(true);
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 3000);
        addXp(50);
        const scoreData = { user_name: userName, score: score > 0 ? score : 10 };
        await supabase.from("leaderboard").insert([scoreData]);
    }, [addXp, userName, score]);

    // Quiz Timer
    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (quizActive && timeLeft > 0 && !showResults) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endQuiz();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => { if (timer) clearInterval(timer); };
    }, [quizActive, timeLeft, showResults, endQuiz]);

    const startQuiz = useCallback(() => {
        setQuizActive(true);
        setCurrentQuestion(0);
        setScore(0);
        setTimeLeft(50);
        setShowResults(false);
    }, []);

    const checkAnswer = useCallback((choice: number) => {
        if (!quizActive || showResults) return;
        const correct = quizQuestions[currentQuestion].correct === choice;
        const timeBonus = Math.floor(timeLeft / 10);
        const points = correct ? 10 + timeBonus : 0;
        if (correct) {
            setScore((prev) => prev + points);
            addXp(15);
        }
        if (currentQuestion < quizQuestions.length - 1) {
            setTimeout(() => setCurrentQuestion((prev) => prev + 1), 400);
        } else {
            setTimeout(() => endQuiz(), 400);
        }
    }, [quizActive, showResults, currentQuestion, timeLeft, addXp, endQuiz]);

    const handleAskAi = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiQuery.trim()) return;
        const userQ = aiQuery.toLowerCase();
        setAiChatLog((prev) => [...prev, { sender: "user", text: aiQuery }]);
        setAiQuery("");
        setAiLoading(true);

        setTimeout(() => {
            let responseText = "In biblical terms, a covenant is an unbreakable sacred bond witnessed by God. In Part 2, we see how breaking covenants can bring severe consequences, as demonstrated in 2 Samuel 21.";
            if (userQ.includes("saul") || userQ.includes("famine") || userQ.includes("samuel")) {
                responseText = "In 2 Samuel 21:1-9, Israel suffered a 3-year famine because King Saul had broken the covenant made with the Gibeonites. God held Israel accountable to honor sacred oaths.";
            } else if (userQ.includes("rainbow") || userQ.includes("noah") || userQ.includes("genesis 9")) {
                responseText = "The rainbow (Genesis 9:13-17) serves as a physical token/presentation of God's everlasting covenant with Noah and all living creatures never to destroy the earth with a flood again.";
            } else if (userQ.includes("type") || userQ.includes("fact")) {
                responseText = "Covenants can be for peace, blessing, priesthood, or inheritance. Key facts: they are sacred, binding, sealed with blood or tokens, and carry penalties when broken.";
            }
            setAiChatLog((prev) => [...prev, { sender: "ai", text: responseText }]);
            setAiLoading(false);
            addXp(10);
        }, 600);
    };

    const PAYSTACK_PUBLIC_KEY = "pk_test_bed97038ebcf74b30219ed0500cfffc6e80948f1";
    const PAYMENT_AMOUNT = 500000;

    const initializePaystack = () => {
        if (!window.PaystackPop) {
            alert("Paystack SDK not loaded!");
            return;
        }
        const paystack = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: "user@example.com",
            amount: PAYMENT_AMOUNT,
            currency: "NGN",
            reference: "SSA_" + Math.floor(Math.random() * 1000000000 + 1),
            onClose: () => {},
            callback: () => {
                setIsPaid(true);
                setShowPaymentGate(false);
                addXp(200);
            },
        });
        paystack.openIframe();
    };

    const themeClasses = darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900";

    if (appLoading) {
        return (
            <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50 p-4 overflow-hidden" role="status" aria-label="Loading Sunday School App">
                <div className="text-center relative z-10 w-full max-w-sm px-4">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-1 shadow-2xl flex items-center justify-center animate-bounce mb-6">
                        <img src={logo} alt="Life Gate Ministries Logo" className="w-14 h-14 object-contain rounded-2xl" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block">Life Gate Ministries Worldwide</span>
                    <h1 className="text-xl font-black text-white mt-1 mb-6">Sunday School Experience</h1>
                    <div className="w-full max-w-[240px] mx-auto bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-slate-700">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (showPaymentGate) {
        return (
            <div className={`min-h-screen ${themeClasses} flex items-center justify-center p-3 sm:p-6 transition-colors duration-300`} style={{ fontSize: `${fontSize}px` }}>
                <div className="max-w-4xl w-full relative z-10 py-8 animate-fadeIn">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl p-1 shadow-2xl flex items-center justify-center animate-pulse">
                            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">Life Gate Ministries Worldwide</span>
                        <h1 className="text-2xl sm:text-4xl font-black mt-1 mb-2">Sunday School Portal</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"} border rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01]`}>
                            <div>
                                <h2 className="text-xl font-bold mb-2">Standard Access</h2>
                                <div className="text-3xl font-black mb-4">₦0</div>
                                <p className="text-xs text-slate-400 mb-6">Full lesson text, audio reader, and interactive study tools.</p>
                            </div>
                            <button
                                onClick={() => setShowPaymentGate(false)}
                                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-semibold text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                Enter Free Session
                            </button>
                        </div>
                        <div className={`relative ${darkMode ? "bg-slate-900 border-blue-500/30 text-slate-100" : "bg-white border-blue-200 text-slate-900"} border rounded-3xl p-6 shadow-xl flex flex-col justify-between overflow-hidden transition-all hover:scale-[1.01]`}>
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Recommended</div>
                            <div>
                                <h2 className="text-xl font-bold mb-2">Premium All-Access</h2>
                                <div className="text-3xl font-black mb-4">₦5,000</div>
                                <p className="text-xs text-slate-400 mb-6">Leaderboard ranking, AI theology tutor, and live discussions.</p>
                            </div>
                            <button
                                onClick={initializePaystack}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 hover:opacity-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                <Sparkles size={16} aria-hidden="true" /> Unlock Premium (₦5,000)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${themeClasses} transition-colors duration-300 relative overflow-x-hidden`} style={{ fontSize: `${fontSize}px` }}>
            {confettiActive && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center px-4" aria-live="polite">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-3xl shadow-2xl text-lg font-black animate-bounce text-center">
                        🎉 Splendid Job! Spiritual Breakthrough Unlocked! 🚀
                    </div>
                </div>
            )}

            <Header logo={logo} contentData={contentData} fontSize={fontSize} adjustFontSize={adjustFontSize} darkMode={darkMode} toggleTheme={toggleTheme} />

            <main className="container mx-auto px-3 sm:px-4 py-6 max-w-5xl relative z-10">
                
                {/* Gamified Stat Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fadeIn">
                    <button
                        onClick={() => setShowAchievements(true)}
                        className={`p-3 rounded-2xl border flex items-center gap-3 text-left transition hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`}
                        aria-label={`Spiritual XP: ${userXp} XP. Click to view achievements.`}
                    >
                        <div className="p-2 bg-amber-500/20 text-amber-500 rounded-xl shrink-0"><Zap size={18} aria-hidden="true" /></div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Spiritual XP</span>
                            <span className="font-black text-sm text-amber-500">{userXp} XP</span>
                        </div>
                    </button>
                    
                    <button
                        onClick={() => setShowAttendanceModal(true)}
                        className={`p-3 rounded-2xl border flex items-center gap-3 text-left transition hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isCheckedIn ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`}
                        aria-label={isCheckedIn ? "Attendance Checked In" : "Click to mark attendance"}
                    >
                        <div className={`p-2 rounded-xl shrink-0 ${isCheckedIn ? "bg-emerald-500 text-white" : "bg-blue-500/20 text-blue-400"}`}><CheckSquare size={18} aria-hidden="true" /></div>
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Attendance</span>
                            <span className="font-black text-xs">{isCheckedIn ? "Checked In! ✓" : "Click to Check In"}</span>
                        </div>
                    </button>
                </div>

                <div className="text-center mb-6 px-2 animate-fadeIn">
                    <h1 className={`text-2xl sm:text-4xl font-black tracking-tight mb-2 ${darkMode ? "bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent" : "text-slate-900"}`}>
                        {contentData.lessonTitle}
                    </h1>
                </div>

                {/* Accessible Navigation Tabs */}
                <div
                    role="tablist"
                    aria-label="Sunday School Lesson Sections"
                    className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center px-1"
                >
                    {[
                        { id: "intro", label: "Intro", icon: Compass },
                        { id: "lesson", label: "Lesson", icon: BookOpen },
                        { id: "conclusion", label: "Conclusion", icon: Shield },
                        { id: "application", label: "Application", icon: Shield },
                        { id: "quiz", label: "Quiz", icon: Award },
                        { id: "chat", label: "Prayer", icon: Flame },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                role="tab"
                                id={`tab-${tab.id}`}
                                aria-selected={isActive}
                                aria-controls={`panel-${tab.id}`}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-4 py-2.5 rounded-2xl font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                    isActive
                                        ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-105"
                                        : darkMode
                                        ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                <Icon size={16} aria-hidden="true" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content Area */}
                <div className={`rounded-3xl border shadow-2xl p-4 sm:p-8 backdrop-blur-xl transition-all duration-300 transform ${tabTransitioning ? "opacity-0 scale-95 translate-y-3" : "opacity-100 scale-100 translate-y-0"} ${darkMode ? "bg-slate-900/80 border-slate-800/80 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`}>
                    
                    {tabTransitioning ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-4" role="status">
                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 animate-pulse">Loading Section...</span>
                        </div>
                    ) : (
                        <>
                            {/* Audio Reader Control Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-slate-700/50">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="voice-select" className="text-xs uppercase font-bold text-blue-500">Audio Reader:</label>
                                    <select
                                        id="voice-select"
                                        value={selectedVoice}
                                        onChange={(e) => setSelectedVoice(e.target.value)}
                                        className={`text-xs px-2.5 py-1.5 rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${darkMode ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"}`}
                                    >
                                        {voices.map((v, i) => <option key={i} value={v.name}>{v.name}</option>)}
                                    </select>
                                </div>
                                <button
                                    onClick={() => toggleSpeech(activeTab === "intro" ? contentData.introduction : contentData.lessonIntro)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isSpeaking ? "bg-rose-600 text-white animate-pulse" : "bg-blue-600 text-white hover:bg-blue-500"}`}
                                    aria-label={isSpeaking ? "Stop audio reading" : "Listen to this section"}
                                >
                                    {isSpeaking ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
                                    <span>{isSpeaking ? "Stop Reading" : "Listen to Section"}</span>
                                </button>
                            </div>

                            {/* INTRODUCTION TAB */}
                            {activeTab === "intro" && (
                                <div
                                    role="tabpanel"
                                    id="panel-intro"
                                    aria-labelledby="tab-intro"
                                    className="space-y-6 animate-fadeIn"
                                >
                                    <div className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? "bg-blue-950/20 border-blue-500/20" : "bg-blue-50 border-blue-200"}`}>
                                        <h2 className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-2 mb-3">
                                            <BookOpen size={16} aria-hidden="true" /> Memory Verse
                                        </h2>
                                        <blockquote className="text-base sm:text-lg italic font-medium mb-3">"{contentData.memoryVerse}"</blockquote>
                                        <button
                                            onClick={() => showBibleVersions("Exodus 2:24")}
                                            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        >
                                            <BookOpen size={14} aria-hidden="true" /> Read Exodus 2:24
                                        </button>
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">Text: Joshua 9:14-19, 2 Samuel 21:1-9</h2>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <button
                                                onClick={() => showBibleVersions("Joshua 9:14-19")}
                                                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                            >
                                                <BookOpen size={14} aria-hidden="true" /> Read Joshua 9:14-19
                                            </button>
                                            <button
                                                onClick={() => showBibleVersions("2 Samuel 21:1-9")}
                                                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                            >
                                                <BookOpen size={14} aria-hidden="true" /> Read 2 Samuel 21:1-9
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold mb-3">Introduction</h2>
                                        <p className="leading-relaxed mb-4">{contentData.introduction}</p>
                                        
                                        {contentData.introScriptures && contentData.introScriptures.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {contentData.introScriptures.map((rf: string) => (
                                                    <button
                                                        key={rf}
                                                        onClick={() => showBibleVersions(rf)}
                                                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                                    >
                                                        <BookOpen size={14} aria-hidden="true" /> {rf}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Aims and Objectives Card (Dynamic Font Sizing Restored) */}
                                    <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                        <h3 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-[0.9em]">Aims and Objectives</h3>
                                        <div className="space-y-2 leading-relaxed opacity-90">
                                            <p><strong className="text-emerald-400">AIMS:</strong> To reveal the implications of covenants since man is surrounded or is obliged to surround himself by it.</p>
                                            <p><strong className="text-emerald-400">OBJECTIVES:</strong> To cause man to be mindful of holy covenants through Christ.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* LESSON TAB */}
                            {activeTab === "lesson" && (
                                <div
                                    role="tabpanel"
                                    id="panel-lesson"
                                    aria-labelledby="tab-lesson"
                                    className="space-y-6 animate-fadeIn"
                                >
                                    <h2 className="text-lg font-bold mb-4">Lesson Content</h2>
                                    <p className="leading-relaxed mb-4">{contentData.lessonIntro}</p>

                                    <div className="space-y-6">
                                        {contentData.lessonPoints.map((section: any, idx: number) => (
                                            <div key={idx} className={`p-4 sm:p-6 rounded-2xl border ${darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="text-base font-bold text-blue-500">{idx + 1}. {section.title}</h3>
                                                </div>
                                                <p className="leading-relaxed mb-3">{section.content}</p>

                                                {section.refs && (
                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        {section.refs.map((rf: string) => (
                                                            <button
                                                                key={rf}
                                                                onClick={() => showBibleVersions(rf)}
                                                                className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 hover:bg-blue-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                                            >
                                                                <BookOpen size={13} aria-hidden="true" /> {rf}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CONCLUSION TAB */}
                            {activeTab === "conclusion" && (
                                <div
                                    role="tabpanel"
                                    id="panel-conclusion"
                                    aria-labelledby="tab-conclusion"
                                    className="space-y-6 animate-fadeIn"
                                >
                                    <h2 className="text-lg font-bold mb-4">Conclusion</h2>
                                    <div className={`p-6 rounded-2xl border ${darkMode ? "bg-indigo-950/20 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"}`}>
                                        <p className="italic leading-relaxed">"{contentData.conclusion}"</p>
                                    </div>
                                </div>
                            )}

                            {/* APPLICATION TAB */}
                            {activeTab === "application" && (
                                <div
                                    role="tabpanel"
                                    id="panel-application"
                                    aria-labelledby="tab-application"
                                    className="space-y-6 animate-fadeIn"
                                >
                                    <h2 className="text-lg font-bold mb-4">Lesson Application</h2>
                                    <div className={`p-6 rounded-2xl border ${darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                        <p className="leading-relaxed">Walk deliberately in the terms of your godly covenants in Christ Jesus, and stand vigilant to discern and dismantle ungodly covenants through prayer and faith.</p>
                                    </div>
                                </div>
                            )}

                            {/* QUIZ TAB */}
                            {activeTab === "quiz" && (
                                <div
                                    role="tabpanel"
                                    id="panel-quiz"
                                    aria-labelledby="tab-quiz"
                                    className="space-y-6 text-center py-4 animate-fadeIn"
                                >
                                    {!quizActive && !showResults && (
                                        <div className="max-w-md mx-auto space-y-4">
                                            <Award size={36} className="mx-auto text-amber-500 animate-bounce" aria-hidden="true" />
                                            <h2 className="text-2xl font-bold">Speed Quiz Challenge</h2>
                                            <p className="text-xs text-slate-400">Test your mastery of the covenant principles and earn +50 XP!</p>
                                            <button
                                                onClick={startQuiz}
                                                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white rounded-2xl font-bold text-sm shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                            >
                                                Start Challenge
                                            </button>

                                            <div className="mt-8 pt-6 border-t border-slate-700/40 text-left">
                                                <h3 className="text-sm font-bold flex items-center gap-2 mb-3"><Trophy size={16} className="text-amber-500" aria-hidden="true" /> Leaderboard</h3>
                                                <div className={`rounded-xl p-3 border ${darkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"} space-y-2`}>
                                                    {leaderboard.length === 0 ? (
                                                        <p className="text-xs text-slate-400 italic">No leaderboard scores yet. Be the first!</p>
                                                    ) : (
                                                        leaderboard.map((entry, idx) => (
                                                            <div key={idx} className="flex justify-between items-center text-xs">
                                                                <span className="font-semibold flex items-center gap-1"><Star size={12} className="text-amber-500" aria-hidden="true" /> {entry.user_name}</span>
                                                                <span className="font-mono font-bold text-blue-500">{entry.score} pts</span>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {quizActive && !showResults && (
                                        <div className="max-w-xl mx-auto text-left space-y-6">
                                            <div className="flex justify-between items-center text-xs font-mono border-b pb-3 text-slate-400">
                                                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                                                <span className="text-amber-500 font-bold" aria-live="polite">⏱ {timeLeft}s</span>
                                            </div>
                                            <h2 className="text-base font-bold">{quizQuestions[currentQuestion].q}</h2>
                                            <div className="grid gap-3">
                                                {quizQuestions[currentQuestion].a.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => checkAnswer(idx)}
                                                        className={`p-4 rounded-2xl border text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${darkMode ? "bg-slate-800/60 hover:bg-blue-600/20 border-slate-700" : "bg-slate-50 hover:bg-blue-50 border-slate-200"}`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {showResults && (
                                        <div className="max-w-md mx-auto space-y-4">
                                            <Award size={48} className="mx-auto text-amber-500 animate-bounce" aria-hidden="true" />
                                            <h2 className="text-2xl font-bold">Challenge Completed!</h2>
                                            <div className="p-6 rounded-2xl border bg-slate-800/40 border-slate-800">
                                                <div className="text-4xl font-black text-blue-500 mb-1">{score}</div>
                                                <p className="text-xs uppercase tracking-wider text-slate-400">Points Earned (+50 XP)</p>
                                            </div>
                                            <button onClick={startQuiz} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Try Again</button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* PRAYER TAB */}
                            {activeTab === "chat" && (
                                <div
                                    role="tabpanel"
                                    id="panel-chat"
                                    aria-labelledby="tab-chat"
                                    className="space-y-6 animate-fadeIn"
                                >
                                    <h2 className="text-lg font-bold mb-4">Prayer Points & Intercession</h2>
                                    <div className="space-y-3 mb-8">
                                        {contentData.prayerPoints.map((prayer: string, idx: number) => (
                                            <div key={idx} className={`p-4 rounded-2xl border flex gap-4 items-start ${darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                                                <div className="w-6 h-6 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</div>
                                                <p className="leading-relaxed">{prayer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* SHAREABLE VERSE CARD MODAL */}
            {showCardModal && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="card-modal-title"
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
                    onClick={() => setShowCardModal(false)}
                >
                    <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-2xl relative text-white text-center space-y-6 overflow-hidden border border-white/20" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)" }} onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-0 right-0 p-4">
                            <button onClick={() => setShowCardModal(false)} className="text-slate-400 hover:text-white" aria-label="Close Modal"><X size={20} /></button>
                        </div>
                        <div className="w-12 h-12 mx-auto bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"><Sparkles className="text-amber-400" size={24} aria-hidden="true" /></div>
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Life Gate Ministries Worldwide</span>
                            <h3 id="card-modal-title" className="text-xl font-black mt-1">{cardVerseRef}</h3>
                        </div>
                        <div className={`p-6 rounded-2xl bg-gradient-to-tr ${cardTheme} shadow-2xl border border-white/20 text-left transition-all`}>
                            <p className="text-sm sm:text-base italic font-serif leading-relaxed">
                                "{initialScriptureDB[cardVerseRef]?.KJV || "Scripture card text preview..."}"
                            </p>
                        </div>
                        <div className="flex justify-center gap-2">
                            {["from-blue-600 via-indigo-600 to-purple-600", "from-emerald-600 to-teal-800", "from-amber-600 to-rose-700"].map((th, i) => (
                                <button key={i} onClick={() => setCardTheme(th)} className={`w-6 h-6 rounded-full bg-gradient-to-r ${th} border-2 border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`} aria-label={`Select theme ${i + 1}`} />
                            ))}
                        </div>
                        <button onClick={() => { alert("✨ Verse Card ready to save/share on WhatsApp status!"); setShowCardModal(false); addXp(15); }} className="w-full py-3 bg-white text-slate-900 font-bold rounded-2xl text-xs shadow-lg hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                            Download / Share to WhatsApp Status (+15 XP)
                        </button>
                    </div>
                </div>
            )}

            {/* AI ASK TEACHER COMPANION MODAL */}
            {showAiModal && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="ai-modal-title"
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn"
                    onClick={() => setShowAiModal(false)}
                >
                    <div className={`rounded-3xl shadow-2xl w-[95%] sm:max-w-lg overflow-hidden border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`} onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-blue-600 text-white">
                            <h3 id="ai-modal-title" className="text-sm font-bold flex items-center gap-2"><Cpu size={18} aria-hidden="true" /> AI Covenant Tutor & Q&A</h3>
                            <button onClick={() => setShowAiModal(false)} className="text-white hover:opacity-80" aria-label="Close Modal"><X size={18} /></button>
                        </div>
                        <div className="p-4 sm:p-6 max-h-[50vh] overflow-y-auto space-y-3">
                            {aiChatLog.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm ${msg.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : darkMode ? "bg-slate-800 text-slate-200 rounded-bl-none" : "bg-slate-100 text-slate-800 rounded-bl-none"}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {aiLoading && <div className="text-xs text-slate-400 italic">AI Tutor is searching scripture...</div>}
                        </div>
                        <form onSubmit={handleAskAi} className="p-3 border-t border-slate-700/50 flex gap-2">
                            <input
                                type="text"
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="Ask a question about covenants or 2 Samuel 21..."
                                aria-label="Type your theological question"
                                className={`flex-1 px-3 py-2.5 rounded-xl border text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-300 text-slate-900"}`}
                            />
                            <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Send message"><Send size={14} /></button>
                        </form>
                    </div>
                </div>
            )}

            {/* Attendance Modal */}
            {showAttendanceModal && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="attendance-modal-title"
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
                    onClick={() => setShowAttendanceModal(false)}
                >
                    <div className={`rounded-3xl shadow-2xl w-full max-w-md p-6 border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`} onClick={(e) => e.stopPropagation()}>
                        <h3 id="attendance-modal-title" className="text-base font-bold mb-4">Mark Attendance (+30 XP)</h3>
                        <form onSubmit={handleCheckIn} className="space-y-4">
                            <div>
                                <label htmlFor="attendance-username" className="block text-xs font-bold text-slate-400 mb-1">Your Name</label>
                                <input
                                    id="attendance-username"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
                                />
                            </div>
                            <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Check In Now</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Bible Verse Reader Modal */}
            {showVerseModal && selectedVerse && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="verse-modal-title"
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
                    onClick={() => setShowVerseModal(false)}
                >
                    <div className={`rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`} onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 id="verse-modal-title" className="font-bold">{selectedVerse}</h3>
                            <button onClick={() => setShowVerseModal(false)} aria-label="Close verse reader"><X size={16} /></button>
                        </div>
                        <div className="flex gap-1.5 p-3 border-b overflow-x-auto" role="tablist" aria-label="Bible versions">
                            {(["KJV", "NKJV", "NIV", "ESV", "AMP", "NLT"] as const).map((ver) => (
                                <button
                                    key={ver}
                                    role="tab"
                                    aria-selected={bibleVersion === ver}
                                    onClick={() => changeBibleVersion(ver)}
                                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${bibleVersion === ver ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-slate-200"}`}
                                >
                                    {ver}
                                </button>
                            ))}
                        </div>
                        <div className="p-6 max-h-[50vh] overflow-y-auto leading-relaxed">
                            {verseLoading ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-3" role="status">
                                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                    <span className="text-xs text-slate-400">Loading verse translation...</span>
                                </div>
                            ) : (
                                formatScriptureText(scriptureDB[selectedVerse]?.[bibleVersion] || "Scripture text not found.")
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Achievements Modal */}
            {showAchievements && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="achievements-modal-title"
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
                    onClick={() => setShowAchievements(false)}
                >
                    <div className={`rounded-3xl shadow-2xl w-full max-w-md p-6 border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`} onClick={(e) => e.stopPropagation()}>
                        <h3 id="achievements-modal-title" className="text-base font-bold mb-4 flex items-center gap-2"><Trophy className="text-amber-500" size={18} aria-hidden="true" /> Spiritual Achievements</h3>
                        <p className="text-xs opacity-80 mb-4">You have accumulated {userXp} Spiritual XP through attendance, quizzes, and reflection notes!</p>
                        <button onClick={() => setShowAchievements(false)} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SundaySchoolApp;
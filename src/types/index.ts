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

export interface LessonPoint {
    title: string;
    content: string;
    refs?: string[];
}

export interface ContentData {
    lessonDate: string;
    lessonTitle: string;
    memoryVerse: string;
    memoryVerseRef: string;
    introduction: string;
    lessonIntro: string;
    lessonPoints: LessonPoint[];
    conclusion: string;
    prayerPoints: string[];
}
export class UserCriterion {
    private _id: number;
    private _userId: number;
    private _criterionId: number;
    private _userScore: boolean;
    private _date: Date;
    private _supervisorScore: boolean | null;

    constructor(userId: number, criterionId: number, userScore: boolean, date: Date, supervisorScore?: boolean | null, id?: number) {
        this._id = id ?? 0;
        this._userId = userId;
        this._criterionId = criterionId;
        this._userScore = userScore;
        this._date = date;
        this._supervisorScore = supervisorScore ?? null;
    }

    get id(): number {
        return this._id;
    }

    get userId(): number {
        return this._userId;
    }

    get criterionId(): number {
        return this._criterionId;
    }

    get userScore(): boolean {
        return this._userScore;
    }

    get supervisorScore(): boolean | null {
        return this._supervisorScore;
    }

    get date(): Date | null {
        return this._date;
    }

    set userScore(score: boolean) {
        this._userScore = score;
    }

    set supervisorScore(score: boolean | null) {
        this._supervisorScore = score;
    }

    set date(date: Date | null) {
        this._date = date;
    }
}

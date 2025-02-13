export class UserSelfImprovement {
    private _id: number;
    private _userId: number;
    private _improvementId: number;
    private _userScore: number;
    private _date: Date;
    private _supervisorScore: number | null;

    constructor(userId: number, improvementId: number, userScore: number, date: Date, supervisorScore?: number | null, id?: number) {
        this._id = id ?? 0;
        this._userId = userId;
        this._improvementId = improvementId;
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

    get improvementId(): number {
        return this._improvementId;
    }

    get userScore(): number {
        return this._userScore;
    }

    get supervisorScore(): number | null {
        return this._supervisorScore;
    }

    get date(): Date | null {
        return this._date;
    }

    set userScore(score: number) {
        this._userScore = score;
    }

    set supervisorScore(score: number | null) {
        this._supervisorScore = score;
    }

    set date(date: Date | null) {
        this._date = date;
    }
}

export class Vacation {
    public constructor(
        public id: number,
        public destination: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public startDate: Date,
        public endDate: Date,
        public isFollowed?: number,
        public amountOfFollowers?: number,
    ) { }
}

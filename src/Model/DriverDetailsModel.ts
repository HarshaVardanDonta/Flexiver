class DriverDetails {

    firstName!: string;
    lastName!: string;
    email!: string;
    mobileNo!: string;
    aBNNo!: string;
    subUrb!: string;
    city!: string;
    isVerified!: boolean;
    availability!: string;
    canYouLiftAndGroove!: string;
    flexerTale!: string;
    flexerStyle!: string;
    lastDanceMove!: string;
    vehicleType!: string;
    vehicleModel!: string;
    vehicleMake!: string;
    vehicleYear!: string;

    toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobileNo: this.mobileNo,
            aBNNo: this.aBNNo,
            subUrb: this.subUrb,
            city: this.city,
            isVerified: this.isVerified,
            availability: this.availability,
            canYouLiftAndGroove: this.canYouLiftAndGroove,
            flexerTale: this.flexerTale,
            flexerStyle: this.flexerStyle,
            lastDanceMove: this.lastDanceMove,
            vehicleType: this.vehicleType,
            vehicleModel: this.vehicleModel,
            vehicleMake: this.vehicleMake,
            vehicleYear: this.vehicleYear,
        }
    }
}

export default DriverDetails;
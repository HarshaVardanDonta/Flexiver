class CustomerQuoteModel {
  id!: number;
  createdAt!: EpochTimeStamp;
  city!: string;
  vehicleType!: string;
  dateAndTime!: EpochTimeStamp;
  pickUpContactName!: string;
  pickUpContactNumber!: string;
  pickUpAddress!: string;
  pickUpInstructions!: string;
  pickUpStairs!: number;
  dropOffContactName!: string;
  dropOffContactNumber!: string;
  dropOffAddress!: string;
  dropOffInstructions!: string;
  dropOffStairs!: number;
  noOfItems!: number;
  approxWeight!: number;
  noOfHaulers!: number;
  parkingSpaceAvailable!: boolean;
  itemNote!: string;
  alternateContactName!: string;
  alternateContactNumber!: string;
  customerId!: string;
  imageUrl!: string;
  pickUpLat!: number;
  pickUpLng!: number;
  dropOffLat!: number;
  dropOffLng!: number;
  orderStatus!: string;

  fromJson(json: any) {
    this.id = json.id;
    this.createdAt = json.createdAt;
    this.city = json.city;
    this.vehicleType = json.vehicleType;
    this.dateAndTime = json.dateAndTime;
    this.pickUpContactName = json.pickUpContactName;
    this.pickUpContactNumber = json.pickUpContactNumber;
    this.pickUpAddress = json.pickUpAddress;
    this.pickUpInstructions = json.pickUpInstructions;
    this.dropOffContactName = json.dropOffContactName;
    this.dropOffContactNumber = json.dropOffContactNumber;
    this.dropOffAddress = json.dropOffAddress;
    this.dropOffInstructions = json.dropOffInstructions;
    this.noOfItems = json.noOfItems;
    this.approxWeight = json.approxWeight;
    this.noOfHaulers = json.noOfHaulers;
    this.parkingSpaceAvailable = json.parkingSpaceAvailable;
    this.itemNote = json.itemNote;
    this.alternateContactName = json.alternateContactName;
    this.alternateContactNumber = json.alternateContactNumber;
    this.customerId = json.customerId;
    this.imageUrl = json.imageUrl;
    this.pickUpLat = json.pickUpLat;
    this.pickUpLng = json.pickUpLng;
    this.dropOffLat = json.dropOffLat;
    this.dropOffLng = json.dropOffLng;
    this.orderStatus = json.orderStatus;
  }

  toJson() {
    return {
      city: this.city,
      vehicleType: this.vehicleType,
      dateAndTime: this.dateAndTime,
      pickUpContactName: this.pickUpContactName,
      pickUpContactNumber: this.pickUpContactNumber,
      pickUpAddress: this.pickUpAddress,
      pickUpInstructions: this.pickUpInstructions,
      dropOffContactName: this.dropOffContactName,
      dropOffContactNumber: this.dropOffContactNumber,
      dropOffAddress: this.dropOffAddress,
      dropOffInstructions: this.dropOffInstructions,
      noOfItems: this.noOfItems,
      approxWeight: this.approxWeight,
      noOfHaulers: this.noOfHaulers,
      parkingSpaceAvailable: this.parkingSpaceAvailable,
      itemNote: this.itemNote,
      alternateContactName: this.alternateContactName,
      alternateContactNumber: this.alternateContactNumber,
      customerId: this.customerId,
      imageUrl: this.imageUrl,
      pickUpLat: this.pickUpLat,
      pickUpLng: this.pickUpLng,
      dropOffLat: this.dropOffLat,
      dropOffLng: this.dropOffLng,
      orderStatus: this.orderStatus,
    };
  }
}

export default CustomerQuoteModel;

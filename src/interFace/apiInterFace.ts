export interface SubCategoryType {
  _id: string;
  subCategoryName: string;
  subcategoryclass: string;
  categoryName: string;
}

export interface ProductType {
    id: string;  
    title_ru: string;
    title_uz: string;
    price: string;
    old_price: string;
    text_ru: string;
    text_uz: string;
    rating: number;
    status: string;
    video_url?: string | null; 
    category_id: string;  
    category: any;
    created_at: Date;
}

export interface OrderDataType {
  _id:string;
  buyerEmail: string | undefined;
  Country: string;
  name: string;
  Address: string;
  City: string;
  Postcode: string;
  EmailAddress: string;
  date: string;
  Phone: string;
  totalPrice: number;
  orderProducts?: any;
  paymentId: string;
}

export interface blogDataType {
  id:string
  title_uz: string;
  title_en: string;
  title_zh: string;
  title_tr: string;
  title_ru: string;  
  text_uz: string;
  text_en: string;
  text_zh: string;
  text_tr: string;
  text_ru: string; 
  author: string; 
}

export interface ICategory {
  id:string;
  image_src: string;
  name_ru: string;
  name_uz: string;
  text_ru: string;
  text_uz: string;
}
export interface CategoryType {
  id: string;
  name_en: string;
  name_ru: string;
  
}




// team interface

export interface TeamMember {
  _id:string;
  title: string;
  subTitle: string;
  img: string;
  imgTwo: string;
  imgThree: string;
  date: string;
  aboutMe: string;
  phone: string;
  email: string;
  location: string;
  skills: Skill[];
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface Skill {
  skillName: string;
  precent: string;
}



// offer Product Type 

export interface offerProductType {
  _id:string;
  productId:string;
  productName:string;
  banner: string;
  date:string;
  offerPersent:number;
  price: number;
  oldPrice:number;
  productDetails:string;
}

export interface UserContactType {
  _id:string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date:string
}


// team

export interface TeamMemberType {
  _id:string;
  title: string;
  subTitle: string;
  img: string;
  imgTwo: string;
  imgThree: string;
  date: string;
  aboutMe: string;
  phone: string;
  email: string;
  location: string;
  skills: Skill[];
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface Skill {
  skillName: string;
  precent: string;
}

export interface RefundRequest {

  _id: string;
  name: string;
  date: string;
  email: string;
  phone: string;
  message: string;
  productId: string;
  paymentId: string;
  productName: string;
}
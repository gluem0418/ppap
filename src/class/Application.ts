import Application_json from '@/assets/json/Application.json';

export interface Point {
  title: string;
  texts: string[];
}

export default class Application {
  id: string;
  introduction: string;
  thumbnail: string;
  points: Point[];
  screenShot: string[];
  environment: string[];
  
  constructor(data: Application) {
    this.id = data.id;
    this.introduction = data.introduction;
    this.thumbnail = data.thumbnail;
    this.points = data.points;
    this.screenShot = data.screenShot;
    this.environment = data.environment;
  }
}

export const applications = Application_json.map((data: any) => new Application(data))
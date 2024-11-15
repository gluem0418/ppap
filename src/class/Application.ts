import Application_json from '@/assets/json/Application.json';

export interface Point {
  title: string;
  texts: string[];
}

export default class Application {
  id: string;
  introduction: string;
  caution: string;
  thumbnail: string;
  points: Point[];
  screenShot: string[];
  environment: string[];
  tool: string[];
  url: string;
  githubUrl: string;

  constructor(data: Application) {
    this.id = data.id;
    this.introduction = data.introduction;
    this.caution = data.caution;
    this.thumbnail = data.thumbnail;
    this.points = data.points;
    this.screenShot = data.screenShot;
    this.environment = data.environment;
    this.tool = data.tool;
    this.url = data.url;
    this.githubUrl = data.githubUrl;
  }
}

export const applications = Application_json.map((data: any) => new Application(data))
import Skill_json from '@/assets/json/Skill.json';

export interface Techs {
  name: string;
  rank: number;
}

export default class Skill {
  category: string;
  techs: Techs[];
  
  constructor(data: Skill) {
    this.category = data.category;
    this.techs = data.techs;
  }
}

export const skills = Skill_json.map((data: any) => new Skill(data))
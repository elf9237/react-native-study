import Student from './Student'

export default class MingStudent extends Student{
  constructor(){
    super('小亮',60,'女');
  }
  getDescription(){
    return '哈哈'+super.getDescription();
  }
}

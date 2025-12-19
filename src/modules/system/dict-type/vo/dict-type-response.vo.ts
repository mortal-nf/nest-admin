import { DictItemEntity } from '../../dict-item/dict-item.entity'
import { DictTypeEntity } from '../dict-type.entity'

// 字典类型响应VO 接口，继承自字典类型实体类，添加一个 children 属性，用于存储字典项实体类的数组
export class DictTypeResponseVo extends DictTypeEntity {
  children: DictItemEntity[]
}

import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {headerType} from './modules/headerType'
import {footerType} from './modules/footerType'
import {layoutType} from './layoutType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, headerType, footerType, layoutType],
}

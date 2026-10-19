
import { categoryType } from './category'
import { authorType } from './author'
import { postType } from './documents/post'
import { page } from './documents/page'
import { person } from './documents/person'
import { blockContent } from './objects/blockContent'
import { blockContentTextOnly } from './objects/blockContentTextOnly'
import button from './objects/button'
import { callToAction } from './objects/callToAction'
import { infoSection } from './objects/infoSection'
import { link } from './objects/link'
import { settings } from './singletons/settings'

export const schemaTypes = [
  postType,
  authorType,
  categoryType,
  page,
  person,
  settings,
  blockContent,
  blockContentTextOnly,
  button,
  callToAction,
  infoSection,
  link,
]

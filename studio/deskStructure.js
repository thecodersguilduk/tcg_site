import S from '@sanity/desk-tool/structure-builder'
//TODO - can we amend what is seen in the desk structure based on
// admin level? Or just remove some stuff?
export default () =>
  S.list()
    .title('Content')
    .items(
      S.documentTypeListItems()
    )
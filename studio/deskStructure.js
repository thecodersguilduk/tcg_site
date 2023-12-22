export default (S) =>
  S.list()
    .title('Content')
    .items(
      S.documentTypeListItems()
    )
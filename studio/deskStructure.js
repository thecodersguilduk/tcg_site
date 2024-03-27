export default (S) =>
  S.list()
    .title('The Coders Guild Website Management System')
    .items([
      S.listItem().title('Course Directory').child(
        S.list().title('Course Directory').items([
          S.listItem().title('Courses').child(
            S.documentTypeList('course').title('Courses')
          ),
          S.listItem().title('Course Types').child(
            S.documentTypeList('courseTypes').title('Course Types')
          ),
          S.listItem().title('Course Durations').child(
            S.documentTypeList('courseDuration').title('Course Durations')
          ),
          S.listItem().title('Course Topics').child(
            S.documentTypeList('courseTopics').title('Course Topics')
          ),
          S.listItem().title('Course Partners').child(
            S.documentTypeList('coursePartners').title('Course Partners')
          ),
          S.listItem().title('Course Benefits').child(
            S.documentTypeList('courseBenefits').title('Course Benefits')
          )
          ])
      ),
      ...S.documentTypeListItems()
    ],
      
    )
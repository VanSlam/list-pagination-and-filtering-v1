/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Zach Vanslambrook

//----------------------------------------------------------------------------------------------------------------------

// variables
let listItemElements = document.querySelectorAll('li')
let numberPerPage = 10
let noStudent = document.createElement('noStudent')
noStudent.innerHTML = 'No students found'
noStudent.style.display = 'none'
noStudent.id = 'none-found'
document.querySelector('.page').appendChild(noStudent)

//used to show the page
function showPage(list, page) {
  //pemdas
  let startIndex = page * numberPerPage - numberPerPage
  let endIndex = page * numberPerPage

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = ''
    } else {
      list[i].style.display = 'none'
    }
  }
}

//function that creates and appends elements to the
//DOM
function appendPageLinks(list) {
  const pagDiv = document.createElement('div')
  const pageDiv = document.querySelector('.page')
  const ul = document.createElement('ul')
  const pagesNeeded = Math.ceil(list.length / 10)

  pagDiv.className = 'pagination'

  pageDiv.appendChild(pagDiv)
  pagDiv.appendChild(ul)

  for (let i = 0; i < pagesNeeded; i++) {
    const li = document.createElement('li')
    ul.appendChild(li)
    const a = document.createElement('a')
    a.href = '#'
    a.textContent = i + 1
    li.appendChild(a)
  }

  const anchors = document.querySelectorAll('a')

  ul.firstElementChild.firstElementChild.className = 'active'

  //add an event listener for clicks
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', e => {
      const liCollection = ul.getElementsByTagName('li')

      for (let i = 0; i < liCollection.length; i++) {
        liCollection.item(i).firstElementChild.className = ''
      }
      e.target.className = 'active'
      showPage(list, e.target.textContent)
    })
  }
}

//function to create and append search bar elements

function appendSearchBar() {
  const searchBarDiv = document.createElement('div')
  const searchBar = document.createElement('input')
  const searchBarButton = document.createElement('button')

  //different way to add contect to the button and box
  //instead of createElement('input', 'placeholder', 'Search for students...')

  searchBar.placeholder = 'Search for students...'
  searchBar.id = 'search-bar'
  searchBar.className = 'student-search'
  searchBarButton.id = 'search-bar-button'
  searchBarButton.className = 'student-search'
  searchBarButton.innerHTML = 'Search'

  searchBarDiv.appendChild(searchBar)
  searchBarDiv.appendChild(searchBarButton)
  document.querySelector('.page-header').appendChild(searchBarDiv)
}

appendSearchBar()

//add fuctionality to the search bar
const search = document.querySelector('#search-bar')
const searchBarButton = document.querySelector('#search-bar-button')
search.setAttribute('onkeyup', 'searchStudents(search, listItemElements)')
search.addEventListener('keyup', () => {
  if (!document.querySelectorAll('.match').length && search.value !== '') {
    document.querySelector('#none-found').style.display = ''
    document.querySelector('.pagination').remove()
    appendPageLinks('<ul></ul>')
  } else if (document.querySelectorAll('.match').length) {
    document.querySelector('#none-found').style.display = 'none'
    document.querySelector('.pagination').remove()
    let matched = document.querySelectorAll('.match')
    for (let i = 0; i < matched.length; i++) {
      matched[i].style.display = ''
    }
    appendPageLinks(matched)
    showPage(matched, 1)
  } else if (search.value == '') {
    document.querySelector('.pagination').remove()
    appendPageLinks(listItemElements)
    showPage(listItemElements, 1)
  }
})
searchBarButton.setAttribute(
  'click',
  'searchStudents(search, listItemElements)'
)

//function for searchign students using search bar and the students list
function searchStudents(search, students) {
  for (let i = 0; i < students.length; i++) {
    students[i].classList.remove('match')
    if (
      search.value.length !== 0 &&
      students[i]
        .querySelector('h3')
        .textContent.toLowerCase()
        .includes(search.value.toLowerCase())
    ) {
      students[i].classList.add('match')
    } else if (search.value.length === 0) {
      students[i].style.display = ''
    } else {
      students[i].style.display = 'none'
    }
  }
}

//call the functions
appendPageLinks(listItemElements)
showPage(listItemElements, 1)

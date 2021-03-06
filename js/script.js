/* eslint-disable no-inner-declarations */
{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-authorList-link').innerHTML)
  };


  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('event:', event);
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      console.log('removing active links');
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .post.active');

    for(let activeArticle of activeArticles){
      console.log('remove active articles');
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log (targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags',
    optAuthorListSelector = '.authors',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){
      console.log(article);

      /* get the article id */

      const articleId = article.getAttribute('id');
      console.log('articleId:', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle:', articleTitle);

      /* get the title from the title element */
      /* create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTML:', linkHTML);

      /* insert link into titleList */

      //titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML;
      console.log('html:', html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function generateTags(){
    /*[NEW] create a new variable allTags with an empty object*/
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){
      console.log(article);

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      console.log('tagList:', tagList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log('tag:', tag);

        /* method for replacing polish chars but what with data-tags?
        String.prototype.noPLs = function(){
          return this.replace(/??/g, 'a').replace(/??/g, 'A')
            .replace(/??/g, 'c').replace(/??/g, 'C')
            .replace(/??/g, 'e').replace(/??/g, 'E')
            .replace(/??/g, 'l').replace(/??/g, 'L')
            .replace(/??/g, 'n').replace(/??/g, 'N')
            .replace(/??/g, 'o').replace(/??/g, 'O')
            .replace(/??/g, 's').replace(/??/g, 'S')
            .replace(/??/g, 'z').replace(/??/g, 'Z')
            .replace(/??/g, 'z').replace(/??/g, 'Z');
          }
          let noPLs = tag.noPLs();
          console.log('noPLs:', noPLs); */

        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log('linkHTML:', linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        console.log('html:', html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
          /* [NEW] add tag to allTags */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column*/
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData:', allTagsData);
  }

  function calculateTagsParams(tags){
    const params = {
      min: 999999,
      max: 0
    };
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }

    console.log('params:', params);
    return params;
  }
  /*Calculate tag class number*/
  function calculateTagClass(count, params){
    const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * (optCloudClassCount - 1) + 1);
    console.log('count', count);
    return optCloudClassPrefix + classNumber;
  }

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    console.log('event:', event);

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');
    console.log('clickedElement:', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    /*make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag:', tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTags', activeTags);

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags){
      console.log('activeTag:', activeTag);
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('allTagLinks:', allTagLinks);

    /* START LOOP: for each found tag link */
    for(let TagLink of allTagLinks){
      console.log('TagLink:' + TagLink);
      /* add class active */
      TagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const Tags = document.querySelectorAll('a[href^="#tag-"]');
    console.log('Tags:', Tags);
    /* START LOOP: for each link */
    for (const tag of Tags){
      console.log('tag of Tags:', tag);
      console.log('tag of Tags:' + tag);
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthors(){
    /*NEW create a new variable allAuthors with an empty object*/
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find authors wrapper */
      const postAuthorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('postAuthor:', postAuthorWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get authors from data-authors attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('articleAuthor:', articleAuthor);

      /* generate HTML of the link */
      //const authorHTML = 'rodzaj posi??ku: <a href="#' + articleAuthor + '">' + articleAuthor + '</a>';
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      console.log('authorHTML:', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check and add if this link is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML of all link into the authors wrapper */
      postAuthorWrapper.innerHTML = html;
      console.log('allAuthors:', allAuthors);

    /* END LOOP: for every article: */
    }
    /* NEW find list of authors in right column */
    const AuthorList = document.querySelector(optAuthorListSelector);

    /* [NEW] create variable for all links HTML code */
    //let allAuthorsHTML = '';
    const allAuthorsData = {authors: []};

    /* [NEW] START LOOP: for each author in allTags: */
    for(let articleAuthor in allAuthors){
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const  authorLinkHTML = '<li><a href="#' + articleAuthor + '">' + articleAuthor + '</a> (' + allAuthors[articleAuthor] + ')</li>';
      console.log('AllAuthorsHTML:', authorLinkHTML);

      allAuthorsData.authors.push({
        author: articleAuthor,
        count: allAuthors[articleAuthor],
      });
      /* [NEW] END LOOP: for each articleauthor in allAuthors: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    AuthorList.innerHTML = templates.authorListLink(allAuthorsData);
    console.log('allAuthorsData:', allAuthorsData);
  }

  generateAuthors();

  function AuthorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    console.log('author event:', event);

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Author was clicked!');
    console.log('clickedElement:', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#', '');
    console.log('author:', author);

    /* find all authors links with class active */
    const activeAuthors = document.querySelectorAll('[class*="author"] a.active');
    console.log('activeAuthors:', activeAuthors);

    /* remove class active */
    for(let activeAuthor of activeAuthors){
      console.log('activeAuthor:', activeAuthor);
      activeAuthor.classList.remove('active');
    }

    /* find author link with "href" attribute equal to the "href" constant */
    const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('allAuthorLinks:', allAuthorLinks);

    /* add class active */
    for(let AuthorLink of allAuthorLinks){
      console.log('AuthorLink:' + AuthorLink);
      AuthorLink.classList.add('active');
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const allAuthors = document.querySelectorAll('[class*="author"] a');
    console.log('allAuthors:', allAuthors);
    /* START LOOP: for each link */
    for (const author of allAuthors){
      console.log('author of allAuthors coma:', author);
      console.log('author of allAuthors plus:' + author);
      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click', AuthorClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();
}

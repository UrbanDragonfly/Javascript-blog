/* eslint-disable no-inner-declarations */
{
  'use strict';

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
    optArticleTagsSelector = '.post-tags .list';

  function genereteTitleLinks(customSelector = ''){

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

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

  genereteTitleLinks();

  function generateTags(){
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
          return this.replace(/ą/g, 'a').replace(/Ą/g, 'A')
            .replace(/ć/g, 'c').replace(/Ć/g, 'C')
            .replace(/ę/g, 'e').replace(/Ę/g, 'E')
            .replace(/ł/g, 'l').replace(/Ł/g, 'L')
            .replace(/ń/g, 'n').replace(/Ń/g, 'N')
            .replace(/ó/g, 'o').replace(/Ó/g, 'O')
            .replace(/ś/g, 's').replace(/Ś/g, 'S')
            .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
            .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
          }
          let noPLs = tag.noPLs();
          console.log('noPLs:', noPLs); */

        /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log('tagHTML:', tagHTML);

        /* add generated code to html variable */
        html = html + tagHTML;
        console.log('html:', html);

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
    /* END LOOP: for every article: */
    }
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
    const allTags = document.querySelectorAll('a[href^="#tag-"]');
    console.log('allTags', allTags);
    /* START LOOP: for each link */
    for (const tag of allTags){
      console.log('tag of allTags:', tag);
      console.log('tag of allTags:' + tag);
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();
}

<h1>Programming of User Interfaces - EIT Digital Newspaper</h1>

<h3>Goal</h3>
<p>The goal of this project is to develop a newspaper application with the typical functionalities 
needed to publish/manage a newspaper web page: show the news in its main page, 
show the details of a given news, filter the news according to their category, 
show the newspaper Twitter timeline, create and update the news contents, remove news, etc.<p>

<h3>Non-functional requirements</h3>
<ul>
  <li>The web application must work as a “single-page” application and must be developed using AngularJS 1.7.2</li>
  <li>The application must be mobile responsive and must be properly shown in small devices such as mobile phones or tablets (mobile-first)</li>
  <li>The use of Boostrap is recommended</li>
</ul>

<h3>Functional requirements</h3>
<ul>
  <li>News in the main page must include their title, subtitle, a thumbnail of the image (if exists) and their abstract. The body of the news is not shown in the main page and it will be shown in the news detail page</li>
  <li>The newspaper main page must include a Twitter timeline</li>
  <li>If the user is logged in, the following buttons must appear:
   <ul>
        <li>A button for each news to edit them and redirect to the edition form</li>
        <li>A button to create a new news which redirects to an empty news edition form</li>
        <li>A button for each news to remove the news</li>
   </ul>
  </li>
  
   <li>The navigation bar must show all buttons/links for all categories shown in the newspaper, that is, National, Economy, Sports, Technology and All news </li>
   <li>Links/buttons in the navigation bar must filter the news shown in the main page according to the selected category </li>
   <li>The navigation bar includes a text field to add some text that will be used to filter the news shown in the main page of the newspaper </li>
   
   <li>The news details must be shown with its title, subtitle, abstract, category, body and picture (if it is included in the image)</li>
   <li>The modification date and the username who have modified the content must be shown at the end of the page</li>
   
   <li>The form must include all input to edit/create the news, that is: title, subtitle, abstract, body and picture selection</li>
<li>The categories must be selected in a combo with values: National, Economy, Sports and Technology. Body can be fill in HTML format (a WYSIWYG editor can be used)</li>
  
</ul>

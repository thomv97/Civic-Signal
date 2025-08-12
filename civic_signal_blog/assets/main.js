
async function loadPosts(){
  const res = await fetch('posts/posts.json');
  const posts = await res.json();
  return posts.sort((a,b)=> new Date(b.date) - new Date(a.date));
}
function renderPosts(list, posts){
  list.innerHTML = posts.map(p=>`
    <article class="card article-card">
      <div class="badge">${p.category}</div>
      <h3><a href="posts/${p.slug}.html">${p.title}</a></h3>
      <div class="small">${new Date(p.date).toLocaleDateString()} · ${p.readTime} min read</div>
      <p class="small">${p.excerpt}</p>
    </article>
  `).join('');
}
async function initHome(){
  const listEl = document.getElementById('postList');
  if(!listEl) return;
  const posts = await loadPosts();
  renderPosts(listEl, posts.slice(0, 10));
}
async function initCategory(cat){
  const listEl = document.getElementById('postList');
  if(!listEl) return;
  const posts = await loadPosts();
  const filtered = posts.filter(p=>p.category.toLowerCase()===cat.toLowerCase());
  renderPosts(listEl, filtered);
  const h = document.getElementById('catTitle'); if(h) h.textContent = cat;
}
document.addEventListener('DOMContentLoaded', ()=>{
  const page = document.body.dataset.page;
  if(page === 'home') initHome();
  if(page === 'category') initCategory(document.body.dataset.cat);
  const form = document.getElementById('nlForm');
  if(form) form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Connect this form to Buttondown/Beehiiv/Mailchimp. See README.');
  });
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }
});

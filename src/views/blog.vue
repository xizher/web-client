<template>
  <div class="blog-container">
    <div class="progress" v-if="loading" key="loading">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
    <div v-else key="blogs-box">
      <div v-for="(item, index) in blogObj.items" :key="index" @click="router.push(`/blog-viewer/${item.id}`)" class="card mb-3" style="max-width: 80vw;width: 800px;">
        <div class="row g-0">
          <div class="col-md-4 left-panel">
            <!-- <img src="..."  alt="..."> -->
            <div>{{ item.cTimeFormat }}</div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.detial }}</p>
              <p><span v-for="(elem, index) in item.sides" :key="index" class="badge bg-secondary">{{ elem }}</span></p>
              <p class="card-text"><small class="text-muted">最新更新时间：{{ item.mTimeFormat }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': offset === 0 }" @click="loadBlogs(offset - limit)"><a class="page-link">☚</a></li>
        <li class="page-item"
          v-for="item in Array.from({ length: Math.ceil(blogObj.total / limit)}, (v, i) => i)"
          :key="item"
          @click="loadBlogs(limit * item)"
          :class="{ 'active': item * limit === offset }"
        >
          <a class="page-link">{{ item + 1 }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': offset + limit > blogObj.total }" @click="loadBlogs(offset + limit)"><a class="page-link">☛</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useAxios } from '../hooks/useAjax'
import { useRouter } from 'vue-router'
export default {
  name: 'Blog',
  setup() {
    const { loading, doAxios } = useAxios()
    const blogObj = reactive({
      items: [],
      total: 0
    })
    const offset = ref(0)
    const limit = 5
    const loadBlogs = (_offset) => {
      offset.value = _offset
      doAxios({ method: 'get', url: '/blog', data: {
        where: [[{ field: 'visible', operator: '=', value: true }]],
        order: [{ field: 'createtime', type: 'DESC' }],
        limit, offset: _offset
      } }).then(({items, total}) => {
        blogObj.items = items
        blogObj.total = total
      }).catch(err => console.log (err))
    }
    const router = useRouter()
    loadBlogs(offset.value)
    return {
      blogObj,
      limit,
      loadBlogs,
      offset,
      loading,
      router
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-container {
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left-panel {
  background-color: #868E96;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.badge {
  margin-right: 5px;
}
.page-link {
  cursor: pointer;
}
.progress {
  max-width: 80vw;
  width: 800px;
  margin-bottom: 8px;
}
.pagination {
  max-width: 80vw;
  width: 800px;
  overflow: auto;
}
.card {
  cursor: pointer;
  &:hover:before{
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1.15em;
    height: 3em;
    background: linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, 0.2) 0, rgba(0, 0, 0, 0.3)) 100% 0 no-repeat;
    transform: translateY(-0.85em) rotate(-30deg);
    transform-origin: bottom right;
    box-shadow: -.2em .2em .3em -.1em rgba(0, 0, 0, .15);
    border-bottom-left-radius: inherit; /* 左下角继承border-radius */
  }
}
</style>

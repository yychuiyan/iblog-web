import { Helmet } from 'react-helmet'
import { ExportOutlined } from '@ant-design/icons'

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <Helmet>
        <title>夜雨炊烟 | 新版博客入口</title>
      </Helmet>

      <div className="card w-96 bg-base-100 shadow-xl border-2 border-warning">
        <div className="card-body items-center text-center gap-4">
          {/* 博客名称 */}
          <h1 className="card-title text-2xl font-title">夜雨炊烟</h1>

          {/* 分割线 */}
          <div className="divider my-0"></div>

          {/* 提示文字 */}
          <p className="text-base-content/70 text-sm">博客已迁移至新版站点</p>

          {/* 入口按钮 */}
          <a
            href="https://docs.yychuiyan.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-warning btn-wide text-white"
          >
            新版博客入口 <ExportOutlined />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Landing

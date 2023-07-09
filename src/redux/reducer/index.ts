import { combineReducers } from 'redux';
import { UserLoginReducer } from '@/redux/reducer/user/login';
import { UserRegisterReducer } from '@/redux/reducer/user/register';
import { QQLoginReducer } from '@/redux/reducer/user/qqLogin';
import { LoginOutReducer } from '@/redux/reducer/user/loginout';
import { LikeCreateReducer } from '@/redux/reducer/like/add';
import { LikeListReducer } from '@/redux/reducer/like/list';
import { EssayLikeCreateReducer } from '@/redux/reducer/essayLike/add';
import { EssayLikeListReducer } from '@/redux/reducer/essayLike/list';
import { ArticleListReducer } from '@/redux/reducer/articles/list';
import { ArticleAllListReducer } from '@/redux/reducer/articles/list_all';
import { ArticleSearchListReducer } from '@/redux/reducer/articles/search';
import { ArticleViewsActionReducer } from '@/redux/reducer/articles/views';
import { ArticleCommentsReducer } from '@/redux/reducer/articles/comment/list';
import { ArticleCommentInsertReducer } from '@/redux/reducer/articles/comment/insert';
import { MessageListReducer } from '@/redux/reducer/messages/list';
import { MessageInsertReducer } from '@/redux/reducer/messages/insert';
import { EssayListReducer } from '@/redux/reducer/essay/list';
import { FriendlyListReducer } from '@/redux/reducer/friendly/list';
import { AboutListReducer } from '@/redux/reducer/about/list';
import { LoadingReducer } from '@/redux/reducer/loading';
import { ModeReducer } from '@/redux/reducer/mode';
import { VerseReducer } from '@/redux/reducer/verse';
import { SendMailReducer } from '@/redux/reducer/mail';
import { AfficheListReducer } from '@/redux/reducer/affiche/list';
import { ApothegmListReducer } from '@/redux/reducer/apothegm/list';
import { WebsitVisitReducer } from '@/redux/reducer/visit';
import { WebsitVisitNumberReducer } from '@/redux/reducer/visit/list';
const RootReducer = combineReducers({
  UserLoginReducer,
  UserRegisterReducer,
  QQLoginReducer,
  LoginOutReducer,
  LikeCreateReducer,
  LikeListReducer,
  ArticleListReducer,
  ArticleAllListReducer,
  ArticleSearchListReducer,
  ArticleViewsActionReducer,
  ArticleCommentsReducer,
  ArticleCommentInsertReducer,
  MessageListReducer,
  MessageInsertReducer,
  EssayListReducer,
  EssayLikeListReducer,
  EssayLikeCreateReducer,
  FriendlyListReducer,
  AboutListReducer,
  LoadingReducer,
  ModeReducer,
  VerseReducer,
  SendMailReducer,
  AfficheListReducer,
  WebsitVisitReducer,
  WebsitVisitNumberReducer,
  ApothegmListReducer,
});
export default RootReducer;

import { combineReducers } from 'redux';
import { UserLoginReducer } from './user/login';
import { UserRegisterReducer } from './user/register';
import { QQLoginReducer } from './user/qqLogin';
import { LoginOutReducer } from './user/loginout';
import { LikeCreateReducer } from '../like/add';
import { LikeListReducer } from '../like/list';
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
import { LoadingReducer } from './loading';
import { ModeReducer } from './mode';
import { VerseReducer } from './verse';
import { SendMailReducer } from './mail';
import { AfficheListReducer } from './affiche/list';
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
  FriendlyListReducer,
  AboutListReducer,
  LoadingReducer,
  ModeReducer,
  VerseReducer,
  SendMailReducer,
  AfficheListReducer,
});
export default RootReducer;

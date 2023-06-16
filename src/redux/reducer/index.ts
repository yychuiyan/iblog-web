import { combineReducers } from 'redux';
import { UserLoginReducer } from './user/login';
import { LoginOutReducer } from './user/loginout';
import { LikeUpdateReducer } from './articles/like';
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
const RootReducer = combineReducers({
  UserLoginReducer,
  LoginOutReducer,
  LikeUpdateReducer,
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
});
export default RootReducer;

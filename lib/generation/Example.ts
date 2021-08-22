import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Account } from './Account';
import { BookingAvailableTime } from './BookingAvailableTime';
import { CallRate } from './CallRate';
import { CallRooms } from './CallRooms';
import { Calls } from './Calls';
import { Discount } from './Discount';
import { HostTopic } from './HostTopic';
import { Metafield } from './Metafield';
import { NotificationSettings } from './NotificationSettings';
import { Order } from './Order';
import { OrderItem } from './OrderItem';
import { Photo } from './Photo';
import { ScheduledTask } from './ScheduledTask';
import { Transactions } from './Transactions';
import { VariantPhoto } from './VariantPhoto';

@Index('user_full_text_idx', ['fullText'], {})
@Index('user_pkey', ['slug'], { unique: true })
@Entity('user', { schema: 'admyre' })
export class User extends BaseEntity {
  @Column('text', { primary: true, name: 'slug' })
  slug: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'now()',
  })
  updatedAt: Date | null;

  @Column('text', { name: 'about', nullable: true })
  about: string | null;

  @Column('text', { name: 'user_name', nullable: true })
  userName: string | null;

  @Column('text', { name: 'store_url', nullable: true, default: () => "''" })
  storeUrl: string | null;

  @Column('text', { name: 'confirmation_url', nullable: true })
  confirmationUrl: string | null;

  @Column('text', { name: 'cancel_url', nullable: true })
  cancelUrl: string | null;

  @Column('text', { name: 'logo_image_url', nullable: true })
  logoImageUrl: string | null;

  @Column('text', { name: 'account_confirmation_url', nullable: true })
  accountConfirmationUrl: string | null;

  @Column('text', { name: 'full_name', nullable: true })
  fullName: string | null;

  @Column('integer', {
    name: 'minute_rate',
    nullable: true,
    default: () => '0',
  })
  minuteRate: number | null;

  @Column('text', { name: 'profile_type', nullable: true, array: true })
  profileType: string[] | null;

  @Column('tsvector', { name: 'full_text', nullable: true })
  fullText: string | null;

  @Column('timestamp with time zone', {
    name: 'last_online_at',
    nullable: true,
    default: () => 'now()',
  })
  lastOnlineAt: Date | null;

  @Column('boolean', {
    name: 'is_online',
    nullable: true,
    default: () => 'true',
  })
  isOnline: boolean | null;

  @Column('boolean', {
    name: 'visibility',
    nullable: true,
    default: () => 'false',
  })
  visibility: boolean | null;

  @Column('boolean', {
    name: 'is_busy',
    nullable: true,
    default: () => 'false',
  })
  isBusy: boolean | null;

  @Column('text', {
    name: 'current_socket_id',
    nullable: true,
    default: () => "''",
  })
  currentSocketId: string | null;

  @OneToOne(() => Account, (account) => account.userSlug2)
  account: Account;

  @OneToMany(
    () => BookingAvailableTime,
    (bookingAvailableTime) => bookingAvailableTime.userSlug2
  )
  bookingAvailableTimes: BookingAvailableTime[];

  @OneToMany(() => CallRate, (callRate) => callRate.userSlug2)
  callRates: CallRate[];

  @OneToMany(() => CallRooms, (callRooms) => callRooms.guest)
  callRooms: CallRooms[];

  @OneToMany(() => CallRooms, (callRooms) => callRooms.host)
  callRooms2: CallRooms[];

  @OneToMany(() => Calls, (calls) => calls.guest2)
  calls: Calls[];

  @OneToMany(() => Calls, (calls) => calls.host2)
  calls2: Calls[];

  @OneToMany(() => Discount, (discount) => discount.retailer)
  discounts: Discount[];

  @OneToMany(() => HostTopic, (hostTopic) => hostTopic.userSlug2)
  hostTopics: HostTopic[];

  @OneToMany(() => Metafield, (metafield) => metafield.retailer)
  metafields: Metafield[];

  @OneToOne(
    () => NotificationSettings,
    (notificationSettings) => notificationSettings.userSlug2
  )
  notificationSettings: NotificationSettings;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Order, (order) => order.retailer)
  orders2: Order[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.customer)
  orderItems: OrderItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.retailer)
  orderItems2: OrderItem[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => ScheduledTask, (scheduledTask) => scheduledTask.userSlug2)
  scheduledTasks: ScheduledTask[];

  @OneToMany(() => Transactions, (transactions) => transactions.userSlug2)
  transactions: Transactions[];

  @OneToMany(() => VariantPhoto, (variantPhoto) => variantPhoto.retailer)
  variantPhotos: VariantPhoto[];
}

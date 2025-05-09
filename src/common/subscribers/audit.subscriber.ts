import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { RequestContext } from 'src/common/context/request-context.service';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<BaseEntity> {
  beforeInsert(event: InsertEvent<BaseEntity>) {
    const entity = event.entity;
    const user = RequestContext.getUser();

    if (entity && user) {
      entity.createdBy = user;
    }
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    const entity = event.entity;
    const user = RequestContext.getUser();

    if (entity && user) {
      entity.updatedBy = user;
    }
  }
}

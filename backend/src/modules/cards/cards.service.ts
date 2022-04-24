import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../lists/entities/list.entity';
import { CreateCardDto } from './dtos';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ) {}
  async createCard(dto: CreateCardDto, listId: string): Promise<Card> {
    const list = await this.listRepository.findOne({ id: listId });
    const cards = await this.cardRepository.find({ listId });

    if (!list) {
      throw new NotFoundException('List not found');
    }

    const card = new Card();

    card.listId = listId;
    card.title = dto.title;
    card.description = dto.description ? dto.description : card.description;

    if (cards.length === 0) {
      card.position = 0;
    } else if (cards.length === 1) {
      card.position = 1;
    } else {
      card.position = cards[cards.length - 1].position + 1;
    }

    await this.cardRepository.save(card);

    return card;
  }

  async updateCard(dto: CreateCardDto, id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({ id });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    card.title = dto.title ? dto.title : card.title;
    card.description = dto.description ? dto.description : card.description;

    await this.cardRepository.save(card);

    return card;
  }

  async updateCardPosition(
    cardId: string,
    positionCardId: string,
  ): Promise<{
    UpdatedMovedCard: { id: string; position: number };
    UpdatedPositionCard: {
      id: string;
      position: number;
    };
  }> {
    const card = await this.cardRepository.findOne({ id: cardId });
    const positionCard = await this.cardRepository.findOne({
      id: positionCardId,
    });

    if (!card || !positionCard) {
      throw new NotFoundException('Card not found');
    }
    const cardPosition = card.position;
    const positionCardPosition = positionCard.position;

    card.position = positionCardPosition;

    positionCard.position = cardPosition;

    await this.cardRepository.save(card);
    await this.cardRepository.save(positionCard);

    return {
      UpdatedMovedCard: { id: card.id, position: card.position },
      UpdatedPositionCard: {
        id: positionCard.id,
        position: positionCard.position,
      },
    };
  }

  async getCard(id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({ id });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }

  async deleteCard(
    cardId: string,
    listId: string,
  ): Promise<{ message: string }> {
    const card = await this.cardRepository.findOne({ id: cardId });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    await this.cardRepository.remove(card);

    const lists = await this.listRepository.findOne({
      where: { id: listId },
      relations: ['cards'],
    });

    const cards = lists.cards;

    if (cards.length === 0) {
      return { message: 'Deleted card' };
    }

    for (let i = 0; i < cards.length; i++) {
      cards[i].position = i;
      await this.cardRepository.save(cards[i]);
    }

    return { message: 'Deleted card' };
  }
}

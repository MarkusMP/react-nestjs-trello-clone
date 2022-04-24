import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../../common/guards';
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from './dtos';
import { Card } from './entities/card.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post(':listId')
  createCard(
    @Param('listId') listId: string,
    @Body() dto: CreateCardDto,
  ): Promise<Card> {
    return this.cardsService.createCard(dto, listId);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  updateCard(
    @Param('id') id: string,
    @Body() dto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.updateCard(dto, id);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('/position/:cardId/:positionCardId')
  updateCardPosition(
    @Param('cardId') cardId: string,
    @Param('positionCardId') positionCardId: string,
  ): Promise<{
    UpdatedMovedCard: { id: string; position: number };
    UpdatedPositionCard: {
      id: string;
      position: number;
    };
  }> {
    return this.cardsService.updateCardPosition(cardId, positionCardId);
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getCard(@Param('id') id: string): Promise<Card> {
    return this.cardsService.getCard(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id/list/:listId')
  DeleteCard(
    @Param('id') id: string,
    @Param('listId') listId: string,
  ): Promise<{ message: string }> {
    return this.cardsService.deleteCard(id, listId);
  }
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OlympicGameTypeFilter, GameType } from "./../../globalTypes";

// ====================================================
// GraphQL query operation: PastOlympicEditions
// ====================================================

export interface PastOlympicEditions_allOlympicGames_meta {
  __typename: "Meta";
  /**
   * The unique ID of the entity
   */
  slug: string;
  /**
   * The base root url for the entity on the domain
   */
  url: string | null;
}

export interface PastOlympicEditions_allOlympicGames_toggles {
  __typename: "GameToggles";
  /**
   * Wehther the game has to show the results or not
   */
  results: boolean | null;
}

export interface PastOlympicEditions_allOlympicGames_metaPage {
  __typename: "MetaPage";
  /**
   * The meta title of the entity for SEO purposes
   */
  metaTitle: string | null;
  /**
   * The meta description for SEO purposes
   */
  metaDescription: string | null;
}

export interface PastOlympicEditions_allOlympicGames_emblem_image {
  __typename: "Image";
  /**
   * The templated url of the image in cloudinary format
   */
  urlTemplate: string | null;
  /**
   * The format of the image
   */
  format: string | null;
  /**
   * The title of the image
   */
  title: string;
}

export interface PastOlympicEditions_allOlympicGames_emblem {
  __typename: "Emblem";
  /**
   * Emblem image
   */
  image: PastOlympicEditions_allOlympicGames_emblem_image | null;
}

export interface PastOlympicEditions_allOlympicGames {
  __typename: "OlympicGame";
  /**
   * Meta information about the past Olympic game
   */
  meta: PastOlympicEditions_allOlympicGames_meta;
  /**
   * Olympic edition navigation section toggles set
   */
  toggles: PastOlympicEditions_allOlympicGames_toggles | null;
  /**
   * SEO Meta information about the past Olympic game
   */
  metaPage: PastOlympicEditions_allOlympicGames_metaPage;
  /**
   * The Olympic edition Official Designation
   */
  officialDesignation: string | null;
  /**
   * Whether the Olympic edition is featured
   */
  isFeatured: boolean;
  /**
   * Olympic game location
   */
  location: string;
  /**
   * Olympic game year
   */
  year: number;
  /**
   * Olympic game start date
   */
  startDate: any | null;
  /**
   * Olympic game end date
   */
  endDate: any | null;
  /**
   * Official Olympic game name
   */
  name: string;
  /**
   * The season of the sport.
   */
  season: GameType;
  /**
   * Emblem section of the Olympic game (Olympic game logo)
   */
  emblem: PastOlympicEditions_allOlympicGames_emblem | null;
  /**
   * The Olympic edition Home Explore Link
   */
  homepageExploreLink: string | null;
}

export interface PastOlympicEditions {
  /**
   * Retrieves a list all olympic games filtered by YOG (Youth Olympic Games) or NOT YOG
   */
  allOlympicGames: PastOlympicEditions_allOlympicGames[] | null;
}

export interface PastOlympicEditionsVariables {
  type: OlympicGameTypeFilter;
}

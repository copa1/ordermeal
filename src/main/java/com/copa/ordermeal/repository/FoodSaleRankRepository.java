package com.copa.ordermeal.repository;

import com.copa.ordermeal.model.FoodSaleRank;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodSaleRankRepository {

    List<FoodSaleRank> selectFoodSaleRankAndFoodList();
}

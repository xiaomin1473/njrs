package store.ae.service.mall.goods;

import java.util.List;

import store.ae.pojo.mall.goods.Goods;

public interface GoodsService {

	List<Goods> getGoodsList();

	Goods getGoodsById(long GoodsId);

	// Category getGoodsTypeList();
}

package store.ae.dto.service.mall.feast;

/**
 * @author sidtadpole
 * 
 * 暴露秒杀地址DTO
 *
 */
public class Exposer {
	
	/**
	 * 是否开启秒杀
	 */
	private boolean exposed;
	
	/**
	 * md5加密接口
	 */
	private String md5;
	
	/**
	 * id
	 */
	private long seckillId;
	
	/**
	 * 系统时间,毫秒
	 */
	private long nowTime;
	
	/**
	 * 开启时间
	 */
	private long start;
	
	/**
	 * 结束时间
	 */
	private long end;
	

	@Override
	public String toString() {
		return "Exposer ["+
				"exposed=" + exposed + 
				", md5=" + md5 + 
				", seckillId=" + seckillId + 
				", nowTime=" + nowTime + 
				", start=" + start + 
				", end=" + end + "]";
	}

	public Exposer(boolean exposed, String md5, long seckillId) {
		this.exposed = exposed;
		this.md5 = md5;
		this.seckillId = seckillId;
	}

	public Exposer(boolean exposed, long seckillId, long nowTime, long start, long end) {
		this.exposed = exposed;
		this.seckillId = seckillId;
		this.nowTime = nowTime;
		this.start = start;
		this.end = end;
	}

	public Exposer(boolean exposed, long seckillId) {
		this.exposed = exposed;
		this.seckillId = seckillId;
	}

	public boolean isExposed() {
		return exposed;
	}

	public void setExposed(boolean exposed) {
		this.exposed = exposed;
	}

	public String getMd5() {
		return md5;
	}

	public void setMd5(String md5) {
		this.md5 = md5;
	}

	public long getSeckillId() {
		return seckillId;
	}

	public void setSeckillId(long seckillId) {
		this.seckillId = seckillId;
	}

	public long getNowTime() {
		return nowTime;
	}

	public void setNowTime(long nowTime) {
		this.nowTime = nowTime;
	}

	public long getStart() {
		return start;
	}

	public void setStart(long start) {
		this.start = start;
	}

	public long getEnd() {
		return end;
	}

	public void setEnd(long end) {
		this.end = end;
	}
		
}
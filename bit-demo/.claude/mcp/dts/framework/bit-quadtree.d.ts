/**
 * 矩形类
 */
declare class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * 二维向量类
 */
declare class Vec2 {
    x: number;
    y: number;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-27
 * @Description:
 */

declare enum ShapeType {
    CIRCLE = 1,
    BOX = 2,
    POLYGON = 3
}
interface IShape {
    /** 形状类型 */
    get shapeType(): ShapeType;
    get position(): Vec2;
    get scale(): number;
    get rotation(): number;
    get isPositionDirty(): boolean;
    /** 获取包围盒 */
    getBoundingBox(): Rect;
    setPosition(x: number, y: number): void;
    setScale(value: number): void;
    setRotation(angle: number): void;
    clearPositionDirty(): void;
    destroy(): void;
    /** 重置对象状态以供重用 */
    reset(): void;
    /** 设置掩码 */
    setMask(mask: number): void;
}

/**
 * @Author: Gongxh
 * @Date: 2024-12-21
 * @Description: 对象池，用于管理对象的创建和回收，减少GC压力
 */
/**
 * 可回收对象接口
 */
interface IRecyclable {
    /** 重置对象状态以供重用 */
    reset(): void;
}

/**
 * @Author: Gongxh
 * @Date: 2024-12-21
 * @Description: 四叉树的 形状基类
 */

declare abstract class Shape implements IShape, IRecyclable {
    abstract get shapeType(): ShapeType;
    get mask(): number;
    get position(): Vec2;
    get scale(): number;
    get rotation(): number;
    get isValid(): boolean;
    get isPositionDirty(): boolean;
    setPosition(x: number, y: number): void;
    setRotation(angle: number): void;
    setScale(value: number): void;
    /** 包围盒 子类重写 */
    abstract getBoundingBox(): Rect;
    /**
     * 清除位置变化脏标记
     */
    clearPositionDirty(): void;
    destroy(): void;
    /**
     * 重置对象状态以供重用
     */
    reset(): void;
    /**
     * 子类可重写此方法来实现特定的重置逻辑
     */
    protected onReset(): void;
    /**
     * 设置掩码
     */
    setMask(mask: number): void;
}

/**
 * @Author: Gongxh
 * @Date: 2024-12-21
 * @Description: 多边形
 */

declare class Polygon extends Shape {
    protected _points: Vec2[];
    protected _transformPoints: Vec2[];
    protected _realPoints: Vec2[];
    private _isPosDirty;
    private _isBoxDirty;
    get shapeType(): ShapeType;
    /**
     * 设置多边形的点
     */
    setPoints(points: Vec2[]): void;
    setPosition(x: number, y: number): void;
    /**
     * 获取包围盒
     */
    getBoundingBox(): Rect;
    /**
     * 获取经过所有变换之后的实际的点
     */
    getRealPoints(): Vec2[];
}

/**
 * @Author: Gongxh
 * @Date: 2024-12-21
 * @Description: 矩形
 *
 * 3|2
 * --
 * 0|1
 * 矩形的四个点
 */

declare class Box extends Polygon {
    /**
     * 形状类型
     */
    get shapeType(): ShapeType;
    resetPoints(x: number, y: number, width: number, height: number): void;
    /**
     * 设置矩形尺寸
     */
    setSize(width: number, height: number): void;
    /**
     * 重写包围盒计算，针对矩形进行优化
     */
    getBoundingBox(): Rect;
}

/**
 * @Author: Gongxh
 * @Date: 2024-12-21
 * @Description: 原型
 */

declare class Circle extends Shape {
    private _radius;
    /**
     * 形状类型
     */
    get shapeType(): ShapeType;
    /**
     * 获取包围盒
     */
    getBoundingBox(): Rect;
    get radius(): number;
    set radius(value: number);
    /**
     * 设置半径
     */
    setRadius(radius: number): void;
    private updateBoundingBox;
}

/**
 * @Author: Gongxh
 * @Date: 2024-12-21
 * @Description: 树节点
 */

declare class QuadTree {
    /**
     * 创建一个四叉树
     * @param x 该节点对应的象限在屏幕上的范围的x坐标
     * @param y 该节点对应的象限在屏幕上的范围的y坐标
     * @param width 该节点对应的象限在屏幕上的范围的宽度
     * @param height 该节点对应的象限在屏幕上的范围的高度
     * @param depth 该节点的深度，根节点的默认深度为0
     * @param maxDepth 树的最大深度
     * @param maximum 每个节点（象限）所能包含物体的最大数量
     */
    constructor(x: number, y: number, width: number, height: number, maxDepth?: number, maximum?: number, parent?: QuadTree, depth?: number);
    /**
     * 插入形状
     * @param shape 形状数据
     * 如果不在框内，则向上传递
     * 如果在框内，没有子节点 或者 有子节点但是不再子节点中，则直接插入
     *
     * 如果当前节点存在子节点，则检查物体到底属于哪个子节点，如果能匹配到子节点，则将该物体插入到该子节点中
     * 如果当前节点不存在子节点，将该物体存储在当前节点。
     * 随后，检查当前节点的存储数量，如果超过了最大存储数量，则对当前节点进行划分，划分完成后，将当前节点存储的物体重新分配到四个子节点中。
     */
    insert(shape: IShape): void;
    /**
     * 检索功能：
     * 给出一个物体对象，该函数负责将该物体可能发生碰撞的所有物体选取出来。该函数先查找物体所属的象限，该象限下的物体都是有可能发生碰撞的，然后再递归地查找子象限...
     */
    query(shape: IShape, binaryMask?: number, result?: IShape[]): IShape[];
    /**
     * 动态更新（对外接口）
     */
    update(): void;
    clear(): void;
    /**
     * 获取四叉树所有节点的边界信息
     * @returns 包含所有边界矩形数据的数组
     */
    getTreeBounds(): Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
}

/**
 * @Author: Gongxh
 * @Date: 2024-12-21
 * @Description: 主入口文件
 */

declare function createCircle(radius: number, binaryMask?: number): Circle;
declare function createBox(x: number, y: number, width: number, height: number, binaryMask?: number): Box;
declare function createPolygon(points?: Vec2[], binaryMask?: number): Polygon;

export { Box, Circle, Polygon, QuadTree, ShapeType, createBox, createCircle, createPolygon };
export type { IShape };

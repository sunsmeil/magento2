<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\SalesRule\Api\Data;

/**
 * CouponGenerationSpecInterface
 *
 * @api
 */
interface CouponGenerationSpecInterface extends \Magento\Framework\Api\ExtensibleDataInterface
{
    const COUPON_FORMAT_ALPHANUMERIC = 'alphanum';
    const COUPON_FORMAT_ALPHABETICAL = 'alpha';
    const COUPON_FORMAT_NUMERIC = 'num';

    /**
     * Get the id of the rule associated with the coupon
     *
     * @return int
     */
    public function getRuleId();

    /**
     * Set rule id
     *
     * @param int $ruleId
     * @return $this
     */
    public function setRuleId($ruleId);

    /**
     * Get format of generated coupon code
     *
     * @return string
     */
    public function getFormat();

    /**
     * Set format for generated coupon code
     *
     * @param string $format
     * @return $this
     */
    public function setFormat($format);

    /**
     * Number of coupons to generate
     *
     * @return int
     */
    public function getQuantity();

    /**
     * Set number of coupons to generate
     *
     * @param int $quantity
     * @return $this
     */
    public function setQuantity($quantity);

    /**
     * Get length of coupon code
     *
     * @return int
     */
    public function getLength();

    /**
     * Set length of coupon code
     *
     * @param int $length
     * @return $this
     */
    public function setLength($length);

    /**
     * Get usage limit per coupon
     *
     * @return int|null
     */
    public function getUsagePerCoupon();

    /**
     * Set usage limit per coupon
     *
     * @param int $usesPerCoupon
     * @return $this
     */
    public function setUsagePerCoupon($usesPerCoupon);

    /**
     * Get usage limit per customer
     *
     * @return int|null
     */
    public function getUsagePerCustomer();

    /**
     * Set usage limit per customer
     *
     * @param int $usesPerCustomer
     * @return $this
     */
    public function setUsagePerCustomer($usesPerCustomer);

    /**
     * Get expiration date
     *
     * @return string|null
     */
    public function getExpirationDate();

    /**
     * Set expiration date
     *
     * @param string $expirationDate
     * @return $this
     */
    public function setExpirationDate($expirationDate);

    /**
     * Retrieve existing extension attributes object or create a new one.
     *
     * @return \Magento\SalesRule\Api\Data\CouponGenerationSpecExtensionInterface|null
     */
    public function getExtensionAttributes();

    /**
     * Set an extension attributes object.
     *
     * @param \Magento\SalesRule\Api\Data\CouponGenerationSpecExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Magento\SalesRule\Api\Data\CouponGenerationSpecExtensionInterface $extensionAttributes
    );
}
